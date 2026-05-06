# from django.shortcuts import render
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import Exam, Question, Attempt
# from .serializers import ExamSerializer

# # Create your views here.
# from django.http import JsonResponse
# from .models import User
# import json
# from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
# def register(request):
#     if request.method == "POST":
#         data = json.loads(request.body)

#         user = User.objects.create(
#             name=data["name"],
#             email=data["email"],
#             password=data["password"],
#             is_teacher=data.get("is_teacher", False)  # ✅ NEW
#         )

#         return JsonResponse({
#             "message": "Registered Successfully",
#             "is_teacher": user.is_teacher
#         })


# @csrf_exempt
# def login(request):
#     if request.method == "POST":
#         data = json.loads(request.body)

#         try:
#             user = User.objects.get(
#                 email=data["email"],
#                 password=data["password"]
#             )

#             return JsonResponse({
#                 "message": "Login Success",
#                 "name": user.name,
#                 "is_teacher": user.is_teacher,  # ✅ IMPORTANT
#                 "user_id": user.id             # ✅ IMPORTANT
#             })

#         except User.DoesNotExist:
#             return JsonResponse({
#                 "message": "Invalid Credentials"
#             })
# # GET ALL EXAMS
# @api_view(['GET'])
# def get_exams(request):
#     exams = Exam.objects.all()
#     serializer = ExamSerializer(exams, many=True)
#     return Response(serializer.data)


# # GET SINGLE EXAM WITH QUESTIONS
# @api_view(['GET'])
# def get_exam(request, id):
#     exam = Exam.objects.get(id=id)
#     serializer = ExamSerializer(exam)
#     return Response(serializer.data)


# # SUBMIT EXAM
# @api_view(['POST'])
# def submit_exam(request, id):
#     exam = Exam.objects.get(id=id)
#     answers = request.data.get("answers")

#     score = 0
#     questions = exam.questions.all()

#     for q in questions:
#         if str(q.id) in answers:
#             if answers[str(q.id)] == q.correct_answer:
#                 score += 1

#     Attempt.objects.create(
#         user=request.user,
#         exam=exam,
#         score=score
#     )

#     return Response({"score": score})

#/////////////////////////////////////////////////////

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User, Exam, Question, Attempt, Result
from .serializers import ExamSerializer, AttemptSerializer

# ---------------------------
# REGISTER
# ---------------------------
@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)

        user = User.objects.create(
            name=data["name"],
            email=data["email"],
            password=data["password"],
            is_teacher=data.get("is_teacher", False)
        )

        return JsonResponse({"message": "Registered Successfully"})


# ---------------------------
# LOGIN
# ---------------------------
@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)

        try:
            user = User.objects.get(
                email=data["email"],
                password=data["password"]
            )

            return JsonResponse({
                "message": "Login Success",
                "name": user.name,
                "is_teacher": user.is_teacher,
                "user_id": user.id
            })

        except User.DoesNotExist:
            return JsonResponse({"message": "Invalid Credentials"})


# ---------------------------
# CREATE EXAM (TEACHER)
# ---------------------------
@api_view(['POST'])
def create_exam(request):
    data = request.data.copy()          # ✅ make mutable copy
    user_id = data.pop("user_id", None) # ✅ remove user_id

    try:
        user = User.objects.get(id=user_id)

        if not user.is_teacher:
            return Response({"error": "Only teachers can create exams"})

        serializer = ExamSerializer(data=data)  # ✅ clean data

        if serializer.is_valid():
            serializer.save(created_by=user)    # ✅ attach teacher
            return Response(serializer.data)

        return Response(serializer.errors)

    except User.DoesNotExist:
        return Response({"error": "User not found"})


# ---------------------------



# GET ALL EXAMS (STUDENT)
# ---------------------------
@api_view(['GET'])
def get_exams(request):
    exams = Exam.objects.all()
    serializer = ExamSerializer(exams, many=True)
    return Response(serializer.data)


# ---------------------------
# DELETE EXAM (TEACHER)
# ---------------------------
@api_view(['DELETE'])
def delete_exam(request, id):
    try:
        exam = Exam.objects.get(id=id)
        exam.delete()
        return Response({"message": "Exam deleted"})
    except Exam.DoesNotExist:
        return Response({"error": "Exam not found"})


# ---------------------------
# VIEW ATTEMPTS
# ---------------------------
@api_view(['GET'])
def view_attempts(request, id):
    attempts = Attempt.objects.filter(exam_id=id)
    serializer = AttemptSerializer(attempts, many=True)
    return Response(serializer.data)


# ---------------------------
# SUBMIT EXAM (STUDENT)
# ---------------------------
@api_view(['POST'])
def submit_exam(request, id):
    exam = Exam.objects.get(id=id)
    answers = request.data.get("answers")
    user_id = request.data.get("user_id")

    score = 0
    questions = exam.questions.all()

    for q in questions:
        if str(q.id) in answers:
            if answers[str(q.id)] == q.correct_answer:
                score += 1

    Attempt.objects.create(
        user_id=user_id,
        exam=exam,
        score=score
    )

    return Response({"score": score})

# ---------------------------
# GET SINGLE EXAM WITH QUESTIONS
# ---------------------------
@api_view(['GET'])
def get_exam(request, id):
    try:
        exam = Exam.objects.get(id=id)
        serializer = ExamSerializer(exam)
        return Response(serializer.data)
    except Exam.DoesNotExist:
        return Response({"error": "Exam not found"}, status=404)



@api_view(['POST'])
def submit_exam(request, exam_id):
    user_id = request.data.get("user_id")
    answers = request.data.get("answers")

    exam = Exam.objects.get(id=exam_id)
    user = User.objects.get(id=user_id)

    questions = exam.questions.all()

    score = 0
    total = questions.count()

    # ✅ Evaluate answers
    for q in questions:
        selected = answers.get(str(q.id))  # keys come as string
        if selected == q.correct_answer:
            score += 1

    # ✅ Save result
    result = Result.objects.create(
        user=user,
        exam=exam,
        score=score,
        total=total
    )

    return Response({
        "score": score,
        "total": total,
        "result_id": result.id
    })


@api_view(['GET'])
def get_result(request, result_id):
    result = Result.objects.get(id=result_id)

    return Response({
        "exam_title": result.exam.title,
        "score": result.score,
        "total": result.total
    })

@api_view(['GET'])
def exam_results(request, exam_id):
    from .models import Result

    results = Result.objects.filter(exam_id=exam_id)

    data = []
    for r in results:
        percentage = 0

        # ✅ SAFE CHECK
        if r.total != 0:
            percentage = (r.score / r.total) * 100

        data.append({
            "student": r.user.name,
            "score": r.score,
            "total": r.total,
            "percentage": percentage
        })

    return Response(data)


@api_view(['GET'])
def exam_analytics_all(request):
    results = Result.objects.all()

    data = []
    total_students = results.count()
    pass_count = 0
    total_percentage = 0

    for r in results:
        percentage = (r.score / r.total) * 100 if r.total > 0 else 0

        if percentage >= 40:
            pass_count += 1

        total_percentage += percentage

        data.append({
            "student": r.user.name,
            "exam": r.exam.title,   # ✅ helpful
            "score": r.score,
            "total": r.total,
            "percentage": round(percentage, 2),
            "status": "Pass" if percentage >= 40 else "Fail"
        })

    avg = total_percentage / total_students if total_students > 0 else 0

    return Response({
        "students": data,
        "summary": {
            "total_students": total_students,
            "pass_count": pass_count,
            "fail_count": total_students - pass_count,
            "average_percentage": round(avg, 2)
        }
    })


@api_view(['GET'])
def get_all_students(request):
    results = Result.objects.select_related('user')

    students = {}
    for r in results:
        user = r.user

        if user.id not in students:
            students[user.id] = {
                "id": user.id,
                "username": user.name,
                "total_exams": 0,
                "total_score": 0
            }

        students[user.id]["total_exams"] += 1
        students[user.id]["total_score"] += r.score

    return Response(list(students.values()))