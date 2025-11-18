from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.core.cache import cache
from django.core.mail import send_mail
import random
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from datetime import timedelta
from .models import EmailOTP, PasswordResetOTP



class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        user.is_active = False
        user.save()

        token = email_verification_token.make_token(user)
        verification_link = f"http://localhost:3000/auth/verify?uid={user.pk}&token={token}"

        send_mail(
            subject="Verify your email",
            message=f"Click the link to verify your email: {verification_link}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False,
        )



# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })
    
@api_view(['POST'])
def send_otp(request):
    email = request.data.get("email")

    if not email:
        return Response({"error": "Email required"}, status=400)

    otp = str(random.randint(100000, 999999))

    # store or replace otp
    EmailOTP.objects.update_or_create(
        email=email,
        defaults={"otp": otp, "created_at": timezone.now()}
    )

    send_mail(
        subject="Your OTP Code",
        message=f"Your OTP is {otp}. It expires in 5 minutes.",
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({"message": "OTP sent successfully"})


@api_view(['POST'])
def verify_otp(request):
    email = request.data.get("email")
    otp = request.data.get("otp")

    if not email or not otp:
        return Response({"error": "Missing email or otp"}, status=400)

    try:
        otp_obj = EmailOTP.objects.get(email=email)
    except EmailOTP.DoesNotExist:
        return Response({"error": "OTP not found"}, status=400)

    # check expiry (5 minutes)
    if otp_obj.created_at < timezone.now() - timedelta(minutes=5):
        return Response({"error": "OTP expired"}, status=400)

    if otp_obj.otp != otp:
        return Response({"error": "Invalid OTP"}, status=400)

    # OTP valid -> login/create user
    user, created = User.objects.get_or_create(username=email, email=email)
    user.is_active = True
    user.save()

    refresh = RefreshToken.for_user(user)

    # delete OTP record
    otp_obj.delete()

    return Response({
        "message": "OTP verified",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    })

@api_view(['POST'])
def forgot_password(request):
    email = request.data.get("email")

    if not email:
        return Response({"error": "Email required"}, status=400)

    # Check user exists
    user = User.objects.filter(email=email).first()
    if not user:
        return Response({"error": "No user with this email"}, status=400)

    otp = str(random.randint(100000, 999999))

    PasswordResetOTP.objects.update_or_create(
        email=email,
        defaults={"otp": otp, "created_at": timezone.now()}
    )

    send_mail(
        subject="Password Reset OTP",
        message=f"Your OTP is {otp}. It expires in 5 minutes.",
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({"message": "OTP sent"})


@api_view(['POST'])
def reset_password(request):
    email = request.data.get("email")
    otp = request.data.get("otp")
    new_password = request.data.get("new_password")

    if not all([email, otp, new_password]):
        return Response({"error": "Email, OTP, and new password are required"}, status=400)

    otp_obj = PasswordResetOTP.objects.filter(email=email).first()
    if not otp_obj:
        return Response({"error": "No OTP request found"}, status=400)

    # Expired?
    if otp_obj.created_at < timezone.now() - timedelta(minutes=5):
        otp_obj.delete()
        return Response({"error": "OTP expired"}, status=400)

    if otp_obj.otp != otp:
        return Response({"error": "Invalid OTP"}, status=400)

    # Reset password
    user = User.objects.filter(email=email).first()
    user.set_password(new_password)
    user.save()

    # remove OTP
    otp_obj.delete()

    return Response({"message": "Password reset successful"})


@api_view(['POST'])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    user = User.objects.filter(email=email).first()
    if not user:
        return Response({"error": "User not found"}, status=400)

    if not user.check_password(password):
        return Response({"error": "Invalid password"}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "Login successful",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    })

@api_view(['POST'])
def register_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered"}, status=400)

    user = User.objects.create_user(
        username=email,
        email=email,
        password=password
    )

    user.save()

    return Response({"message": "Registration successful"}, status=201)
