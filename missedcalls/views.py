from rest_framework import views, status
from rest_framework.response import Response
import json
import requests

from applications.models import Application
from applicants.models import Applicant
from stages.models import Stage


class MissedCall(views.APIView):
    def get(self, request, format=None):
        sid = 'indusaction2'
        token = '837eb35d5a0624183222b4cfc13d229fe1e515c6'
        mobile = request.GET.get('From')

        if mobile:
            app, created = Applicant.objects.get_or_create(mobile=mobile)

            if created:
                application = Application.objects.get(pk=1)
                stage = Stage.objects.get(default_stage=True)

                app.application = application
                app.stage = stage
                app.assignee = stage.assignee

                app.save()

            requests.post('https://twilix.exotel.in/v1/Accounts/{sid}/Calls/connect.json'.format(sid=sid),
                          auth=(sid, token),
                          data={
                              'From': mobile,
                              'To': '01139595925',
                              'CallerId': '01139595925',
                              'Url': 'http://my.exotel.in/exoml/start/56288',
                              'CallType': 'trans'
                          })

            return Response({'status': 'ok'}, status.HTTP_200_OK)

        return Response({'status': 'not ok'}, status.HTTP_400_BAD_REQUEST)
