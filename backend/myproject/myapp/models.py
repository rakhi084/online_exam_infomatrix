# # models.py

# from django.db import models
# from django.contrib.auth.hashers import make_password


# # =====================================================
# # USER MODEL
# # =====================================================

# class User(models.Model):
#     ROLE_CHOICES = (
#         ('admin', 'Admin'),
#         ('candidate', 'Candidate'),
#     )

#     name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=255)
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='candidate')
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def save(self, *args, **kwargs):
#         # hash password before saving
#         if not self.password.startswith('pbkdf2_'):
#             self.password = make_password(self.password)
#         super().save(*args, **kwargs)

#     def __str__(self):
#         return self.name


# # =====================================================
# # EXAM MODEL
# # =====================================================

# class Exam(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField(blank=True, null=True)
#     duration = models.IntegerField(help_text="Duration in minutes")
#     total_marks = models.IntegerField()
#     start_time = models.DateTimeField()
#     end_time = models.DateTimeField()
#     created_by = models.ForeignKey(User, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.title


# # =====================================================
# # QUESTION MODEL
# # =====================================================

# class Question(models.Model):
#     DIFFICULTY_CHOICES = (
#         ('Easy', 'Easy'),
#         ('Medium', 'Medium'),
#         ('Hard', 'Hard'),
#     )

#     exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
#     question_text = models.TextField()
#     marks = models.IntegerField(default=1)
#     difficulty = models.CharField(
#         max_length=20,
#         choices=DIFFICULTY_CHOICES,
#         default='Medium'
#     )

#     def __str__(self):
#         return self.question_text[:50]


# # =====================================================
# # OPTION MODEL
# # =====================================================

# class Option(models.Model):
#     question = models.ForeignKey(
#         Question,
#         on_delete=models.CASCADE,
#         related_name='options'
#     )
#     option_text = models.TextField()
#     is_correct = models.BooleanField(default=False)

#     def __str__(self):
#         return self.option_text


# # =====================================================
# # RESPONSE MODEL
# # =====================================================

# class Response(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     selected_option = models.ForeignKey(Option, on_delete=models.CASCADE)
#     answered_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.name} - {self.question.id}"


# # =====================================================
# # RESULT MODEL
# # =====================================================

# class Result(models.Model):
#     STATUS_CHOICES = (
#         ('Pass', 'Pass'),
#         ('Fail', 'Fail'),
#     )

#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
#     score = models.IntegerField()
#     percentage = models.FloatField()
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES)
#     completed_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.name} - {self.exam.title}"


# # =====================================================
# # PROCTORING LOG MODEL
# # =====================================================

# class ProctoringLog(models.Model):
#     EVENT_CHOICES = (
#         ('tab_switch', 'Tab Switch'),
#         ('multiple_faces', 'Multiple Faces'),
#         ('no_face', 'No Face Detected'),
#         ('audio_detected', 'Audio Detected'),
#     )

#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
#     event_type = models.CharField(max_length=100, choices=EVENT_CHOICES)
#     timestamp = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.name} - {self.event_type}"



from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name