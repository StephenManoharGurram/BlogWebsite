from django.urls import path
from .views import send_otp, verify_otp, me
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("send-otp/", send_otp),
    path("verify-otp/", verify_otp),
    path("me/", me),
]
