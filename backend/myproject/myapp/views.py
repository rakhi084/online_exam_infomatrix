from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import User
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)

        User.objects.create(
            name=data["name"],
            email=data["email"],
            password=data["password"]
        )

        return JsonResponse({"message":"Registered Successfully"})
    

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
                "message":"Login Success",
                "name":user.name
            })

        except:
            return JsonResponse({
                "message":"Invalid Credentials"
            })