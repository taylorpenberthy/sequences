from rest_framework import serializers
from .models import Sequence


class SequenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sequence
        fields = ['name', 'description', 'sequence']