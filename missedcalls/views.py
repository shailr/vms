from rest_framework import views, status
from rest_framework.response import Response
import json

from applications.models import Application
from applicants.models import Applicant
from stages.models import Stage

class MissedCall(views.APIView):
    def post(self, request, format=None):
        if request.data:
            data = request.data

            app = Applicant.objects.get_or_create(mobile=data['From'])

            return Response({'status': 'ok'}, status.HTTP_200_OK)

        return Response({'status': 'not ok'}, status.HTTP_400_BAD_REQUEST)
