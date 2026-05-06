from rest_framework import serializers
from .models import Exam, Question, Attempt , Result

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        exclude = ['exam']


class ExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Exam
        fields = '__all__'
        extra_kwargs = {
            'created_by': {'required': False}  # ✅ IMPORTANT
        }
    def create(self, validated_data):
        questions_data = validated_data.pop('questions')

    # ✅ get created_by from serializer.save(created_by=user)
        created_by = validated_data.pop('created_by', None)

        exam = Exam.objects.create(created_by=created_by, **validated_data)

        for q in questions_data:
            Question.objects.create(exam=exam, **q)

        return exam

   

class AttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attempt
        fields = '__all__'



class ResultSerializer(serializers.ModelSerializer):
    exam_title = serializers.CharField(source="exam.title", read_only=True)
    student = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Result
        fields = "__all__"