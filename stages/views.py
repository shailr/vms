from rest_framework import permissions, viewsets
from rest_framework.response import Response

from stages.models import Stage
from stages.serializers import StageSerializer


class StageViewSet(viewsets.ModelViewSet):
    queryset = Stage.objects.order_by('-created_at')
    serializer_class = StageSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        if self.request.method == 'POST':
            return (permissions.AllowAny(),)


def perform_create(self, serializer):
    instance = serializer.save(application=self.request.user.curr_application,
                               assignee=self.request.user)

    return super(PostViewSet, self).perform_create(serializer)


class ApplicationStagesViewSet(viewsets.ViewSet):
    queryset = Stage.objects.select_related('application').all()
    serializer_class = StageSerializer

    def list(self, request, application_name=None):
        queryset = self.queryset.filter(application__name=application_name)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
