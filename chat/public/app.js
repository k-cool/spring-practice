console.log("app.js");

const socket = io();

let mySocketId = null;

// DOM
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const imageInput = document.getElementById("imageInput");
const usersEl = document.getElementById("users");
const userCount = document.getElementById("userCount");
const headerUserCount = document.getElementById("headerUserCount");

// 닉네임 모달
const nicknameModal = document.getElementById("nicknameModal");
const nicknameInput = document.getElementById("nicknameInput");
const nicknameBtn = document.getElementById("nicknameBtn");
const nicknameError = document.getElementById("nicknameError");

// 이미지 모달
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

// 연결
socket.on("connect", () => {
  mySocketId = socket.id;
});

// 닉네임 제출 공통 처리
function submitNickname() {
  const nickname = nicknameInput.value.trim();
  if (!nickname) {
    showNicknameError("닉네임을 입력해 주세요.");
    return;
  }
  if (nickname.length < 2) {
    showNicknameError("닉네임은 2자 이상이어야 합니다.");
    return;
  }
  clearNicknameError();
  socket.emit("set nickname", nickname);
}

function showNicknameError(msg) {
  nicknameError.textContent = msg;
  nicknameInput.classList.add("error");
  nicknameInput.focus();
}

function clearNicknameError() {
  nicknameError.textContent = "";
  nicknameInput.classList.remove("error");
}

nicknameBtn.addEventListener("click", submitNickname);

nicknameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitNickname();
});

// 닉네임 중복
socket.on("nickname taken", () => {
  showNicknameError(
    "이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해 주세요.",
  );
});

// 닉네임 확정 → 입장
socket.on("nickname ok", () => {
  nicknameModal.style.display = "none";
});

// 텍스트 전송
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  socket.emit("chat message", text);
  input.value = "";
});

// 이미지 업로드
imageInput.addEventListener("change", async () => {
  const file = imageInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/upload", { method: "POST", body: formData });
  const data = await res.json();
  socket.emit("image message", { url: data.url });
  imageInput.value = "";
});

// 이미지 확대
function openImage(src) {
  modalImage.src = src;
  imageModal.style.display = "flex";
}

function closeImage() {
  imageModal.style.display = "none";
}

imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) closeImage();
});

function renderMessage(data, isLive = true) {
  if (data.type === "system") {
    const div = document.createElement("div");
    div.classList.add("system-msg");
    div.textContent = data.text;
    messages.appendChild(div);
    return;
  }

  // 실시간 메시지는 senderId로 본인 판단, 이력은 닉네임으로 판단
  const isMe = isLive
    ? data.senderId === mySocketId
    : data.nickname === nicknameInput.value.trim();

  const wrapper = document.createElement("div");
  wrapper.classList.add("message", isMe ? "me" : "other");

  if (!isMe) {
    const name = document.createElement("div");
    name.classList.add("nickname");
    name.textContent = data.nickname || "익명";
    wrapper.appendChild(name);
  }

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  if (data.type === "image") {
    const img = document.createElement("img");
    img.src = data.url;
    img.alt = "이미지";
    img.onclick = () => openImage(data.url);
    bubble.appendChild(img);
  } else {
    bubble.textContent = data.text;
  }

  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);
}

// 이전 채팅 이력 수신 (입장 직후 본인에게만)
socket.on("chat history", (history) => {
  if (history.length > 0) {
    const divider = document.createElement("div");
    divider.classList.add("system-msg");
    divider.textContent = "─── 이전 대화 내역 ───";
    messages.appendChild(divider);
  }
  history.forEach((data) => renderMessage(data, false));
  if (history.length > 0) {
    const divider = document.createElement("div");
    divider.classList.add("system-msg");
    divider.textContent = "─────────────────────";
    messages.appendChild(divider);
  }
  scrollToBottom();
});

// 메시지 수신
socket.on("chat message", (data) => {
  renderMessage(data, true);
  scrollToBottom();
});

// 유저 리스트 수신
socket.on("user list", (list) => {
  usersEl.innerHTML = "";
  list.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    usersEl.appendChild(li);
  });
  const count = list.length;
  userCount.textContent = count;
  headerUserCount.textContent = `${count}명 참여 중`;
});

function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
}
