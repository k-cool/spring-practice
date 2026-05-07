from django.shortcuts import render
from .models import Product


# Create your views here.
def product_list(request):
    products = Product.objects.all()  # 모든 상품 가져오기
    return render(request, "products/product_list.html", {"products": products})
