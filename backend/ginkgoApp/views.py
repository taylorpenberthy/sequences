from django.conf import settings
from django.core.files.storage import FileSystemStorage

from rest_framework import permissions, viewsets, generics, status
from .serializers import DNA_SequenceSerializer
from .models import DNA_Sequence

    
class DNA_SequenceView(generics.ListCreateAPIView):
    serializer_class = DNA_SequenceSerializer
    queryset = DNA_Sequence.objects.all()


