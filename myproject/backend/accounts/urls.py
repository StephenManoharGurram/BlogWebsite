from django.urls import path
from .views import (
    me,
    send_otp,
    verify_otp,
    forgot_password,
    reset_password,
    login_view,      
    register_view,   
)

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("me/", me),
    path("send-otp/", send_otp),
    path("verify-otp/", verify_otp),
    path("forgot-password/", forgot_password),
    path("reset-password/", reset_password),
    path('login/', login_view),
    path("register/", register_view),


]
