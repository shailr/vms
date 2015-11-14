from rest_framework import permissions, viewsets
from rest_framework.response import Response

from history.models import History
from history.serializers import HistorySerializer


class HistoryViewSet(viewsets.ModelViewSet):
    queryset = History.objects.order_by('created_at')
    serializer_class = HistorySerializer

    def get_oermissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        return False


    def perform_create(self, serializer):
        instance = serializer.save(applicant=self.request.data['applicant'],
                                   user=self.request.user)

        return super(HistoryViewSet, self).perform_create(serializer)


class ApplicantHistoryViewSet(viewsets.ViewSet):
    queryset = History.objects.all()
    serializer_class = HistorySerializer

    def list(self, request, applicant_pk=None):
        queryset = self.queryset.filter(applicant__pk=applicant_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
