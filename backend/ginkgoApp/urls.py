from django.urls import path
from . import views
from django.http import HttpResponse
from django.utils.encoding import smart_str
from rest_framework import serializers
import json
from .models import DNA_Sequence
from .serializers import DNA_SequenceSerializer
from rest_framework.renderers import JSONRenderer

def download(request):
    #
    # DJango imposes their will.
    #
    # We first ask for a lazy query that will find all objects.
    # We then evaluate the query by turning it into a list
    # We pass this list of objects to a serializer, which spits out raw json.
    # We pass this raw json to a JSONRenderer to get one string.
    # We pass this string to a browser as a response to their HTTP request.
    #
    # Don't forget many=True.  Why?  Why not.
    #
    seq_query = DNA_Sequence.objects.all()
    serializer = DNA_SequenceSerializer(list(seq_query), many=True)
    json_str = JSONRenderer().render(serializer.data)
    response = HttpResponse(json_str, content_type='application/json')
    # add an HTTP header to tell the browser to download content into a file
    # we'll use a fixed filename for now, dna.json.  the browser will create
    # a new name like dna (1).json if it already exists.
    #
    # content disposition tells the browser how to 'dispose' of the content
    # that comes back from our server.  we tell it to treat the content
    # like an attachment, with a filename.
    response['Content-Disposition'] = 'attachment; filename=%s' % smart_str("dna.json")
    return response

urlpatterns = [
    path('sequences/', views.DNA_SequenceView.as_view()),
    path('download/', download)
]


