from rest_framework import permissions, viewsets
from rest_framework.response import Response

from calls.models import Call
from calls.serializers import CallSerializer


class CallViewSet(viewsets.ModelViewSet):
    queryset = Call.objects.all()
    serializer_class = CallSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST' or self.request.method == 'PUT':
            return (permissions.AllowAny(),)

        return False

    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user,
                                   applicant=self.request.data['applicant'])

        return super(CallViewSet, self).perform_create(serializer)


class ApplicantCallsViewSet(viewsets.ViewSet):
    queryset = Call.objects.all()
    serializer_class = CallSerializer

    def list(self, request, applicant_pk=None):
        queryset = self.queryset.filter(applicant__pk=applicant_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
