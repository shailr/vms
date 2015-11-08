from rest_framework import permissions, viewsets
from rest_framework.response import Response

from applicants.models import Applicant
from applicants.serializers import ApplicantSerializer

from organizations.models import Organization

from authentication.permissions import IsAccountOwner

from applications.models import Application


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.order_by('creted_at')
    serializer_class = ApplicantSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return False

    def perform_create(self, serializer):
        instance = serializer.save(created_by=self.request.user,
                                   application=self.request.data['application'])

        return super(ApplicantViewSet, self).perform_create(serializer)


class ApplicationApplicantsViewSet(viewsets.ViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

    def list(self, request, application_pk=None):
        queryset = self.queryset.filter(application__pk=application_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)


class StageApplicantsViewSet(viewsets.ViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

    def list(self, request, stage_pk=None):
        queryset = self.queryset.filter(stage__pk=stage_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
