from rest_framework import permissions, viewsets
from rest_framework.response import Response

from applications.models import Application
from applications.serializers import ApplicationSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.order_by('-created_at')
    serializer_class = ApplicationSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return False


# Need to implement this
# def perform_create(self, serizalizer):
#     instance = serizalizer.save(organization=self.request.organization)

#     return super(ApplicationViewSet, self).perform_create(serializer)

class OrganizationApplicationsViewSet(viewsets.ViewSet):
    queryset = Application.objects.select_related('organization').all()
    serializer_class = ApplicationSerializer

    def list(self, request, organization=None):
        queryset = self.queryset.filter(organization__name=organization)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
