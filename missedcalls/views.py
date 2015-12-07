from rest_framework import views, status
from rest_framework.response import Response
import json
import requests

from applications.models import Application
from applicants.models import Applicant
from stages.models import Stage

class MissedCall(views.APIView):
    def post(self, request, format=None):
        sid = 'indusaction2'
        token = '837eb35d5a0624183222b4cfc13d229fe1e515c6'
        if request.data:
            data = request.data

            app = Applicant.objects.get_or_create(mobile=data['From'])

            requests.post('https://twilix.exotel.in/v1/Accounts/{sid}/Calls/connect.json'.format(sid=sid),
                          auth=(sid, token),
                          data={
                              'From': data['From'],
                              'To': '01139595925',
                              'CallerId': '01139595925',
                              'Url': 'http://my.exotel.in/exoml/start/56288',
                              'CallType': 'trans'
                          })

        return Response({'status': 'ok'}, status.HTTP_200_OK)

    return Response({'status': 'not ok'}, status.HTTP_400_BAD_REQUEST)
