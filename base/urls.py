from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views



urlpatterns = [
    path('', views.home, name="home"),
    path('HerbertAI/', views.chatbot, name="chatbot"),
    path('input/', views.input, name="input"),
    path('second/', views.second, name="second"),
    path('test/', views.test, name="test"),
    path('example/', views.example, name="example"),
    path('handle/', views.json_handler_view, name="handle"),
    path('json/', views.returnjson, name="json"),
    path("login/", views.login_view, name="mylogin"),
    path("logout/", views.logout_view, name="logout"),
    path("signup/", views.authView, name="signup"),
    path("ussd/", views.ussd, name="ussd"),
]



