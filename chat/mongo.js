import mongoose from "mongoose";

const HISTORY_LIMIT = Number(process.env.HISTORY_LIMIT) || 50;

// 스키마 정의
const messageSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["text", "image", "system"], required: true },
    text: { type: String },
    url: { type: String },
    nickname: { type: String },
    senderId: { type: String },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } },
);

const Message = mongoose.model("messages", messageSchema);

// DB 연결 — server.js 시작 시 명시적으로 await 호출
export async function connect() {
  await mongoose.connect(process.env.DB_URL, {
    dbName: process.env.DB_NAME,
  });

  console.log("✅ MongoDB Atlas connected");
}

export async function saveMessage(data) {
  console.log(data);

  await Message.create(data);
}

export async function getRecentMessages() {
  const docs = await Message.find({}, { _id: 0, __v: 0 })
    .sort({ createdAt: -1 })
    .limit(HISTORY_LIMIT)
    .lean();
  return docs.reverse();
}
