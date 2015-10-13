from rest_framework import permissions, viewsets
from rest_framework.response import Response

from history.models import History
from history.serializers import HistorySerializer


class HistoryViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.order_by('created_at')
    serializer_class = HistorySerializer

    def get_oermissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        return False


def perform_create(self, serializer):
    instance = serializer.save(applicant=self.request.user.curr_applicant,
                               user=self.request.user)

    return super(HistoryViewSet, self).perform_create(serializer)


class ApplicantHistoryViewSet(viewsets.ViewSet):
    queryset = History.objects.select_related('applicant').all()
    serializer_class = HistorySerializer

    def list(self, request, applicant_mobile=None):
        queryset = self.queryset.filter(applicant__mobile=applicant_mobile)
        serializer_class = HistorySerializer

        return Response(serializer.data)
