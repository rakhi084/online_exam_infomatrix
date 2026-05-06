from django.urls import path
from . import views

# urlpatterns = [
#     path("register/", views.register),
#     path("login/", views.login),
#     path('exams/', views.get_exams),
#     path('exam/<int:id>/', views.get_exam),
#     path('submit/<int:id>/', views.submit_exam),
# ]

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login),
    path('exams/<int:id>/', views.get_exam), 
    path('create-exam/', views.create_exam),
    path('exams/', views.get_exams),
    path('delete-exam/<int:id>/', views.delete_exam),
    path('attempts/<int:id>/', views.view_attempts),
    # path('submit/<int:id>/', views.submit_exam),
    path('submit-exam/<int:exam_id>/', views.submit_exam),
    path('result/<int:result_id>/', views.get_result),
    path('exam-results/<int:exam_id>/', views.exam_results),
    path('exam-analytics/', views.exam_analytics_all),
    path('students/', views.get_all_students),
]