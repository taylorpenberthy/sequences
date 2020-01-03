from django.urls import path
from . import views
from django.core import serializers
from django.http import HttpResponse
from django.utils.encoding import smart_str
from rest_framework import serializers
import json
import re
from .models import DNA_Sequence
from .serializers import DNA_SequenceSerializer
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt

def validateSeq(seq):
    pattern = re.compile('^[ACTG]+$', re.IGNORECASE)
    return pattern.match(seq) != None
    
def storeDNA(dnaSpec):
    dna = dnaSpec['sequences']
    for item in dna:
        j_name = item['sequenceName']
        j_description = item['sequenceDescription']
        j_seq = item['sequence']
        try:
            d = DNA_Sequence.objects.get(name=j_name)
            print("Already have " +j_name)
        except:
            # weak validation, but its a start
            # we're not looking for SQL injection etc. in the name, desc
            if validateSeq(j_seq):
                d_new = DNA_Sequence.objects.create(name=j_name, description=j_description, sequence=j_seq)
                print('adding DNA' + j_name)
            else: 
                print('rejecting DNA' + j_name)
    return 'Database updated'

@csrf_exempt
def upload(request):
    json_response = {'error': 'what are you doing?'}
    if request.method == 'POST' and request.FILES['myfile']:
        mydata = json.loads(request.FILES['myfile'].file.read())
        try:
            json_response = {'ok': storeDNA(mydata)}
        except:
            json_response = {'error': 'bad format'}
    json_str = JSONRenderer().render(json_response)
    return HttpResponse(json_str, content_type='application/json')

def reformat_dna(dna):
    return {'sequenceName': dna['name'], 'sequenceDescription': dna['description'], 'sequence': dna['sequence']}
        
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
    json_str = JSONRenderer().render({'sequences': map(reformat_dna, serializer.data)})
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
    path('download/', download),
    path('upload/', upload)
]


