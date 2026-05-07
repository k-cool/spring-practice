import cv2

img = cv2.imread(
    "./K2aIdV10a5Od9U3Armt4Bhdch7J_A4sVjzdgHkgh-EMvqhncQ1JKp4kVxvuspNKwEmFJjUjSmpGfsbVXxWlXIg.webp"
)


cv2.putText(img, "OpenCV!", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

cv2.imshow("Text", img)

cv2.waitKey(0)
cv2.destroyAllWindows()
