from rest_framework import serializers
from .models import DNA_Sequence

class DNA_SequenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DNA_Sequence
        fields = ['name', 'description', 'sequence']