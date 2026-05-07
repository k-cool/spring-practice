import sys
import cv2
import numpy as np
import random

from PyQt5.QtWidgets import (
    QApplication,
    QWidget,
    QLabel,
    QPushButton,
    QVBoxLayout,
    QHBoxLayout,
    QFileDialog,
)

from PyQt5.QtGui import QImage, QPixmap
from PyQt5.QtCore import Qt


class TikTokFilterApp(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("틱톡 느낌 필터")
        self.resize(1000, 700)

        self.cap = None

        # 현재 모드 저장
        self.current_mode = "normal"

        # --------------------------
        # 영상 표시 영역
        # --------------------------
        self.video_label = QLabel()
        self.video_label.setAlignment(Qt.AlignCenter)

        # --------------------------
        # 버튼들
        # --------------------------
        self.open_btn = QPushButton("영상 열기")
        self.normal_btn = QPushButton("원본")
        self.tiktok_btn = QPushButton("틱톡 필터")
        self.edge_btn = QPushButton("엣지")
        self.gray_btn = QPushButton("흑백")
        self.firework_btn = QPushButton("폭죽 효과")
        self.save_btn = QPushButton("영상 저장")

        # --------------------------
        # 이벤트 연결
        # --------------------------
        self.open_btn.clicked.connect(self.open_video)

        self.normal_btn.clicked.connect(lambda: self.play_video("normal"))

        self.tiktok_btn.clicked.connect(lambda: self.play_video("tiktok"))

        self.edge_btn.clicked.connect(lambda: self.play_video("edge"))

        self.gray_btn.clicked.connect(lambda: self.play_video("gray"))

        self.firework_btn.clicked.connect(lambda: self.play_video("firework"))

        self.save_btn.clicked.connect(self.save_video)

        # --------------------------
        # 버튼 레이아웃
        # --------------------------
        btn_layout = QHBoxLayout()

        btn_layout.addWidget(self.open_btn)
        btn_layout.addWidget(self.normal_btn)
        btn_layout.addWidget(self.tiktok_btn)
        btn_layout.addWidget(self.edge_btn)
        btn_layout.addWidget(self.gray_btn)
        btn_layout.addWidget(self.firework_btn)
        btn_layout.addWidget(self.save_btn)

        # --------------------------
        # 메인 레이아웃
        # --------------------------
        main_layout = QVBoxLayout()

        main_layout.addWidget(self.video_label)
        main_layout.addLayout(btn_layout)

        self.setLayout(main_layout)

    # =====================================
    # 영상 열기
    # =====================================
    def open_video(self):

        file_path, _ = QFileDialog.getOpenFileName(
            self, "영상 선택", "", "Video Files (*.mp4 *.avi *.mov)"
        )

        if file_path:
            self.cap = cv2.VideoCapture(file_path)

    # =====================================
    # 폭죽 효과
    # =====================================
    def add_firework_effect(self, frame):

        h, w, _ = frame.shape

        # 랜덤 폭죽 개수
        for _ in range(20):

            x = random.randint(0, w - 1)
            y = random.randint(0, h - 1)

            color = (
                random.randint(100, 255),
                random.randint(100, 255),
                random.randint(100, 255),
            )

            radius = random.randint(2, 6)

            cv2.circle(frame, (x, y), radius, color, -1)

            # 빛 퍼지는 선
            for _ in range(5):

                dx = random.randint(-20, 20)
                dy = random.randint(-20, 20)

                cv2.line(
                    frame,
                    (x, y),
                    (x + dx, y + dy),
                    color,
                    2,
                )

        return frame

    # =====================================
    # 필터 적용
    # =====================================
    def apply_filter(self, frame, mode):

        if mode == "gray":

            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        elif mode == "edge":

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            frame = cv2.Canny(gray, 100, 200)

        elif mode == "tiktok":

            # 밝기 증가
            bright = cv2.convertScaleAbs(frame, alpha=1.2, beta=30)

            # 채도 증가
            hsv = cv2.cvtColor(bright, cv2.COLOR_BGR2HSV)

            hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.5, 0, 255)

            frame = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

            frame = cv2.GaussianBlur(frame, (3, 3), 0)

        elif mode == "firework":

            frame = self.add_firework_effect(frame)

        return frame

    # =====================================
    # 영상 재생
    # =====================================
    def play_video(self, mode):

        if self.cap is None:
            return

        self.current_mode = mode

        self.cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

        while True:

            ret, frame = self.cap.read()

            if not ret:
                break

            frame = self.apply_filter(frame, mode)

            self.show_frame(frame)

            key = cv2.waitKey(25)

            if key == ord("q"):
                break

    # =====================================
    # 영상 저장
    # =====================================
    def save_video(self):

        if self.cap is None:
            return

        save_path, _ = QFileDialog.getSaveFileName(
            self, "저장", "output.mp4", "MP4 Files (*.mp4)"
        )

        if not save_path:
            return

        # 영상 처음으로
        self.cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

        width = int(self.cap.get(cv2.CAP_PROP_FRAME_WIDTH))

        height = int(self.cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        fps = self.cap.get(cv2.CAP_PROP_FPS)

        fourcc = cv2.VideoWriter_fourcc(*"mp4v")

        out = cv2.VideoWriter(save_path, fourcc, fps, (width, height))

        while True:

            ret, frame = self.cap.read()

            if not ret:
                break

            frame = self.apply_filter(frame, self.current_mode)

            # grayscale 처리
            if len(frame.shape) == 2:
                frame = cv2.cvtColor(frame, cv2.COLOR_GRAY2BGR)

            out.write(frame)

        out.release()

        print("저장 완료!")

    # =====================================
    # 프레임 표시
    # =====================================
    def show_frame(self, frame):

        if len(frame.shape) == 2:

            height, width = frame.shape

            q_img = QImage(frame.data, width, height, width, QImage.Format_Grayscale8)

        else:

            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            height, width, channel = rgb.shape

            bytes_per_line = channel * width

            q_img = QImage(
                rgb.data, width, height, bytes_per_line, QImage.Format_RGB888
            )

        pixmap = QPixmap.fromImage(q_img)

        self.video_label.setPixmap(pixmap.scaled(900, 600, Qt.KeepAspectRatio))

        QApplication.processEvents()


# =========================================
# 실행
# =========================================
app = QApplication(sys.argv)

window = TikTokFilterApp()
window.show()

sys.exit(app.exec_())
