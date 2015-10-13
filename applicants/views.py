from rest_framework import permissions, viewsets
from rest_framework.response import Response

from applicants.models import Applicant
from applicants.serializers import ApplicantSerializer


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.order_by('creted_at')
    serializer_class = ApplicantSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        return False


def perform_create(self, serializer):
    instance = serializer.save(application=self.request.user.curr_application,
                               created_by=self.request.user)

    return super(ApplicantViewSet, self).perform_create(serializer)


class ApplicationApplicantsViewSet(viewsets.ViewSet):
    queryset = Applicant.objects.select_related('application').all()
    serializer_class = ApplicantSerializer

    def list(self, request, application_name=None):
        queryset = self.queryset.filter(application__name=application_name)
        serializer_class = ApplicantSerializer

        return Response(serializer.data)
