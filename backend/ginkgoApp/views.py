from django.shortcuts import render
from rest_framework import permissions, viewsets, generics, status
from .serializers import SequenceSerializer
from .models import Sequence

class SequenceView(generics.ListCreateAPIView):
    serializer_class = SequenceSerializer
    queryset = Sequence.objects.all()
# Create your views here.
