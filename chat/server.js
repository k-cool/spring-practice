import "dotenv/config";
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import multer from "multer";
import fs from "fs";
import { connect, saveMessage, getRecentMessages } from "./mongo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// uploads 폴더 생성
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// 정적 파일
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

// 이미지 업로드 API
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

// 유저 목록
const users = {};

io.on("connection", async (socket) => {
  console.log("user connected:", socket.id);

  // 닉네임 설정
  socket.on("set nickname", async (nickname) => {
    const taken = Object.values(users).includes(nickname);

    if (taken) {
      socket.emit("nickname taken");
      return;
    }

    socket.nickname = nickname;
    users[socket.id] = nickname;
    socket.emit("nickname ok");

    // 입장 전 최근 채팅 이력 전송 (본인에게만)
    try {
      const history = await getRecentMessages();
      socket.emit("chat history", history);
    } catch (e) {
      console.error("history load error:", e.message);
    }

    // 입장 메시지 저장 & 브로드캐스트
    const systemMsg = { type: "system", text: `${nickname}님이 입장했습니다.` };
    io.emit("chat message", systemMsg);
    saveMessage(systemMsg).catch((e) =>
      console.error("save error:", e.message),
    );

    io.emit("user list", Object.values(users));
  });

  // 텍스트 메시지
  socket.on("chat message", async (msg) => {
    const data = {
      type: "text",
      text: msg,
      senderId: socket.id,
      nickname: socket.nickname,
    };
    io.emit("chat message", data);
    try {
      console.log(data);

      await saveMessage(data);
      console.log("[DB] 텍스트 저장 완료:", data.text);
    } catch (e) {
      console.error("[DB] 텍스트 저장 실패 - 전체 오류:", e);
    }
  });

  // 이미지 메시지
  socket.on("image message", async (payload) => {
    const data = {
      type: "image",
      url: payload.url,
      senderId: socket.id,
      nickname: socket.nickname,
    };
    io.emit("chat message", data);

    try {
      await saveMessage(data);
      console.log("[DB] 이미지 저장 완료:", data.url);
    } catch (e) {
      console.error("[DB] 이미지 저장 실패 - 전체 오류:", e);
    }
  });

  // 퇴장
  socket.on("disconnect", () => {
    if (socket.nickname) {
      const systemMsg = {
        type: "system",
        text: `${socket.nickname}님이 퇴장했습니다.`,
      };
      io.emit("chat message", systemMsg);

      saveMessage(systemMsg).catch((e) =>
        console.error("save error:", e.message),
      );
    }
    delete users[socket.id];
    io.emit("user list", Object.values(users));
    console.log("user disconnected:", socket.id);
  });
});

// DB 연결 후 서버 시작
connect()
  .then(() => {
    server.listen(3000, () => {
      console.log("🚀 http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB 연결 실패:", err.message);
    process.exit(1);
  });
