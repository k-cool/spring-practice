import cv2
import numpy as np
import os

# =========================
# 설정
# =========================
INPUT_VIDEO = "./input/ive.mp4"
OUTPUT_VIDEO = "./output/output_sunglasses.mp4"

# OpenCV 기본 얼굴 인식 모델
FACE_CASCADE_PATH = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"

# =========================
# 얼굴 인식 모델 로드
# =========================
face_cascade = cv2.CascadeClassifier(FACE_CASCADE_PATH)

# =========================
# 비디오 열기
# =========================
cap = cv2.VideoCapture(INPUT_VIDEO)

if not cap.isOpened():
    print("영상 파일을 열 수 없습니다.")
    exit()

# 영상 정보 가져오기
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)

# 저장 설정
fourcc = cv2.VideoWriter_fourcc(*"mp4v")
out = cv2.VideoWriter(OUTPUT_VIDEO, fourcc, fps, (width, height))

print("처리 시작...")

# =========================
# 프레임 처리
# =========================
while True:
    ret, frame = cap.read()

    if not ret:
        break

    # 그레이 변환
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # 얼굴 탐지
    faces = face_cascade.detectMultiScale(
        gray, scaleFactor=1.1, minNeighbors=5, minSize=(80, 80)
    )

    # 얼굴마다 선글라스 그리기
    for x, y, w, h in faces:

        # 선글라스 위치 계산
        glass_y = y + int(h * 0.35)

        left_eye_x = x + int(w * 0.15)
        right_eye_x = x + int(w * 0.85)

        glass_height = int(h * 0.18)

        # 렌즈
        cv2.rectangle(
            frame,
            (left_eye_x, glass_y),
            (x + int(w * 0.42), glass_y + glass_height),
            (0, 0, 0),
            -1,
        )

        cv2.rectangle(
            frame,
            (x + int(w * 0.58), glass_y),
            (right_eye_x, glass_y + glass_height),
            (0, 0, 0),
            -1,
        )

        # 가운데 연결
        cv2.rectangle(
            frame,
            (x + int(w * 0.42), glass_y + int(glass_height * 0.4)),
            (x + int(w * 0.58), glass_y + int(glass_height * 0.6)),
            (0, 0, 0),
            -1,
        )

        # 다리(귀쪽)
        cv2.line(
            frame, (left_eye_x, glass_y + glass_height // 2), (x, glass_y), (0, 0, 0), 3
        )

        cv2.line(
            frame,
            (right_eye_x, glass_y + glass_height // 2),
            (x + w, glass_y),
            (0, 0, 0),
            3,
        )

    # 결과 저장
    out.write(frame)

    # 화면 출력
    cv2.imshow("Sunglasses Filter", frame)

    # q 누르면 종료
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# =========================
# 종료
# =========================
cap.release()
out.release()
cv2.destroyAllWindows()

print(f"저장 완료: {OUTPUT_VIDEO}")
