from rest_framework import permissions, viewsets
from rest_framework.response import Response

from stages.models import Stage
from applications.models import Application
from stages.serializers import StageSerializer


class StageViewSet(viewsets.ModelViewSet):
    queryset = Stage.objects.order_by('-created_at')
    serializer_class = StageSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return False


    def perform_create(self, serializer):
        instance = serializer.save(assignee=self.request.user,
                                   application=self.request.data['application'])

        return super(StageViewSet, self).perform_create(serializer)


class ApplicationStagesViewSet(viewsets.ViewSet):
    queryset = Stage.objects.all()
    serializer_class = StageSerializer

    def list(self, request, application_pk=None):
        queryset = self.queryset.filter(application__pk=application_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
