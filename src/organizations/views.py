from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

from organizations.models import Organization
from organizations.serializers import OrganizationSerializer

from authentication.permissions import IsAccountOwner


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.order_by('-created_at')
    serializer_class = OrganizationSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)
