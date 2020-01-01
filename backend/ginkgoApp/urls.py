from django.urls import path
from . import views

urlpatterns = [
    path('sequences/', views.SequenceView.as_view())
]