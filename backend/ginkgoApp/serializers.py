from rest_framework import serializers
from .models import DNA_Sequence

# Serializes/Deserializes instances into json
class DNA_SequenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DNA_Sequence
        fields = ['name', 'description', 'sequence']