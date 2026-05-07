from django.contrib import admin

# Register your models here.
from .models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price")  # 리스트에서 보일 컬럼
    search_fields = ("name",)  # 검색 기능 추가
    list_filter = ("price",)  # 필터 추가


admin.site.register(Product, ProductAdmin)  # 커스텀 Admin 등록
