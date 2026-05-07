from django.urls import path
from .views import product_list  # 뷰 함수 가져오기

urlpatterns = [
    path(
        "", product_list, name="product_list"
    ),  # /products/ 경로로 접근하면 product_list 실행
]
