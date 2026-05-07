import sys
import cv2

from PyQt5.QtWidgets import (
    QApplication,
    QWidget,
    QLabel,
    QPushButton,
    QVBoxLayout,
    QHBoxLayout,
    QFileDialog,
    QSlider,
)

from PyQt5.QtGui import QImage, QPixmap
from PyQt5.QtCore import Qt


class ImageEditor(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("PyQt5 OpenCV 이미지 편집기")
        self.resize(900, 700)

        # 원본 이미지
        self.original_img = cv2.imread(
            "./K2aIdV10a5Od9U3Armt4Bhdch7J_A4sVjzdgHkgh-EMvqhncQ1JKp4kVxvuspNKwEmFJjUjSmpGfsbVXxWlXIg.webp"
        )

        if self.original_img is None:
            print("이미지를 찾을 수 없습니다.")
            sys.exit()

        # 현재 표시 이미지
        self.current_img = self.original_img.copy()

        # ---------------------------
        # 이미지 라벨
        # ---------------------------
        self.image_label = QLabel()
        self.image_label.setAlignment(Qt.AlignCenter)

        # ---------------------------
        # 버튼들
        # ---------------------------
        self.gray_btn = QPushButton("흑백")
        self.blur_btn = QPushButton("블러")
        self.edge_btn = QPushButton("엣지")
        self.reset_btn = QPushButton("원본 복구")
        self.save_btn = QPushButton("이미지 저장")

        # 버튼 이벤트 연결
        self.gray_btn.clicked.connect(self.apply_gray)
        self.blur_btn.clicked.connect(self.apply_blur)
        self.edge_btn.clicked.connect(self.apply_edge)
        self.reset_btn.clicked.connect(self.reset_image)
        self.save_btn.clicked.connect(self.save_image)

        # ---------------------------
        # 밝기 슬라이더
        # ---------------------------
        self.brightness_slider = QSlider(Qt.Horizontal)
        self.brightness_slider.setMinimum(-100)
        self.brightness_slider.setMaximum(100)
        self.brightness_slider.setValue(0)
        self.brightness_slider.valueChanged.connect(self.update_brightness_contrast)

        self.brightness_label = QLabel("밝기")

        # ---------------------------
        # 대비 슬라이더
        # ---------------------------
        self.contrast_slider = QSlider(Qt.Horizontal)
        self.contrast_slider.setMinimum(1)
        self.contrast_slider.setMaximum(300)
        self.contrast_slider.setValue(100)
        self.contrast_slider.valueChanged.connect(self.update_brightness_contrast)

        self.contrast_label = QLabel("대비")

        # ---------------------------
        # 버튼 레이아웃
        # ---------------------------
        btn_layout = QHBoxLayout()

        btn_layout.addWidget(self.gray_btn)
        btn_layout.addWidget(self.blur_btn)
        btn_layout.addWidget(self.edge_btn)
        btn_layout.addWidget(self.reset_btn)
        btn_layout.addWidget(self.save_btn)

        # ---------------------------
        # 밝기 레이아웃
        # ---------------------------
        brightness_layout = QHBoxLayout()

        brightness_layout.addWidget(self.brightness_label)
        brightness_layout.addWidget(self.brightness_slider)

        # ---------------------------
        # 대비 레이아웃
        # ---------------------------
        contrast_layout = QHBoxLayout()

        contrast_layout.addWidget(self.contrast_label)
        contrast_layout.addWidget(self.contrast_slider)

        # ---------------------------
        # 메인 레이아웃
        # ---------------------------
        main_layout = QVBoxLayout()

        main_layout.addWidget(self.image_label)

        main_layout.addLayout(btn_layout)
        main_layout.addLayout(brightness_layout)
        main_layout.addLayout(contrast_layout)

        self.setLayout(main_layout)

        # 첫 이미지 표시
        self.update_image(self.current_img)

    # ==================================
    # 이미지 표시 함수
    # ==================================
    def update_image(self, cv_img):

        if len(cv_img.shape) == 2:
            # 흑백 이미지
            height, width = cv_img.shape

            q_img = QImage(
                cv_img.data,
                width,
                height,
                width,
                QImage.Format_Grayscale8,
            )

        else:
            # 컬러 이미지
            rgb_img = cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB)

            height, width, channel = rgb_img.shape

            bytes_per_line = channel * width

            q_img = QImage(
                rgb_img.data,
                width,
                height,
                bytes_per_line,
                QImage.Format_RGB888,
            )

        pixmap = QPixmap.fromImage(q_img)

        self.image_label.setPixmap(
            pixmap.scaled(
                700,
                500,
                Qt.KeepAspectRatio,
            )
        )

    # ==================================
    # 흑백 필터
    # ==================================
    def apply_gray(self):

        gray = cv2.cvtColor(
            self.current_img,
            cv2.COLOR_BGR2GRAY,
        )

        self.current_img = gray

        self.update_image(self.current_img)

    # ==================================
    # 블러 필터
    # ==================================
    def apply_blur(self):

        blur = cv2.GaussianBlur(
            self.current_img,
            (15, 15),
            0,
        )

        self.current_img = blur

        self.update_image(self.current_img)

    # ==================================
    # 엣지 검출
    # ==================================
    def apply_edge(self):

        if len(self.current_img.shape) == 3:
            gray = cv2.cvtColor(
                self.current_img,
                cv2.COLOR_BGR2GRAY,
            )
        else:
            gray = self.current_img

        edges = cv2.Canny(gray, 100, 200)

        self.current_img = edges

        self.update_image(self.current_img)

    # ==================================
    # 밝기 / 대비 조절
    # ==================================
    def update_brightness_contrast(self):

        brightness = self.brightness_slider.value()

        contrast = self.contrast_slider.value() / 100

        adjusted = cv2.convertScaleAbs(
            self.original_img,
            alpha=contrast,
            beta=brightness,
        )

        self.current_img = adjusted

        self.update_image(self.current_img)

    # ==================================
    # 원본 복구
    # ==================================
    def reset_image(self):

        self.current_img = self.original_img.copy()

        self.brightness_slider.setValue(0)
        self.contrast_slider.setValue(100)

        self.update_image(self.current_img)

    # ==================================
    # 이미지 저장
    # ==================================
    def save_image(self):

        file_path, _ = QFileDialog.getSaveFileName(
            self,
            "이미지 저장",
            "",
            "PNG Files (*.png);;JPG Files (*.jpg)",
        )

        if file_path:
            cv2.imwrite(file_path, self.current_img)
            print("이미지 저장 완료:", file_path)


# ======================================
# 앱 실행
# ======================================
app = QApplication(sys.argv)

window = ImageEditor()
window.show()

sys.exit(app.exec_())
