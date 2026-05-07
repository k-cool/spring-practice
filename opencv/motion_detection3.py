import cv2
import datetime

# -----------------------
# 1️⃣ 웹캠 열기 (Windows용 CAP_DSHOW)
# -----------------------
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

# 카메라가 정상 열렸는지 확인
if not cap.isOpened():
    print("카메라를 찾을 수 없습니다.")
    exit()

# -----------------------
# 2️⃣ 초기 프레임 읽기
# -----------------------
ret, frame1 = cap.read()
ret, frame2 = cap.read()

# -----------------------
# 3️⃣ 녹화 설정
# -----------------------
fourcc = cv2.VideoWriter_fourcc(*'XVID')  # AVI 포맷
frame_height, frame_width = frame1.shape[:2]
out = cv2.VideoWriter('motion_record.avi', fourcc, 20.0, (frame_width, frame_height))

# -----------------------
# 4️⃣ 메인 루프
# -----------------------
while cap.isOpened():

    # 프레임 차이 계산
    diff = cv2.absdiff(frame1, frame2)
    gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5,5), 0)

    # 움직임 강조
    _, thresh = cv2.threshold(blur, 20, 255, cv2.THRESH_BINARY)

    # 윤곽선 찾기
    contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    motion_detected = False

    for contour in contours:
        if cv2.contourArea(contour) < 1000:
            continue

        motion_detected = True
        x, y, w, h = cv2.boundingRect(contour)

        pad = 40
        x_new = max(x - pad, 0)
        y_new = max(y - pad, 0)
        w_new = min(w + 2*pad, frame_width - x_new)
        h_new = min(h + 2*pad, frame_height - y_new)

        # 🔹 영역 잘라서 확대 (줌인)
        zoomed = frame1[y_new:y_new+h_new, x_new:x_new+w_new]
        zoomed = cv2.resize(zoomed, (frame_width, frame_height))  # 화면 전체 크기로 확대

        cv2.imshow("Mini CCTV Zoom", zoomed)  # 줌인 화면 표시
    # -----------------------
    # 5️⃣ 움직임 있을 때만 녹화
    # -----------------------
    if motion_detected:
        out.write(frame1)
        # 화면에 "MOTION" 표시
        cv2.putText(frame1, "MOTION", (10,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)
        # 시간 표시
        cv2.putText(frame1, str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")),
                    (10, frame_height-10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255,255,255), 1)

    # 화면 표시
    cv2.imshow("Mini CCTV", frame1)

    # 다음 프레임 준비
    frame1 = frame2
    ret, frame2 = cap.read()
    if not ret:
        break

    # ESC 누르면 종료
    if cv2.waitKey(30) == 27:
        break

# -----------------------
# 6️⃣ 종료 처리
# -----------------------
cap.release()
out.release()
cv2.destroyAllWindows()