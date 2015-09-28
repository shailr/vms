from rest_framework import permissions, viewsets
from rest_framework.response import Response

from organizations.models import Organization
from organizations.serializers import OrganizationSerializer


class OrganizationViewSet():
    queryset = Organization.objects.order_by('-created_at')
    serializer_class = OrganizationSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        return False
