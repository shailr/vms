from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import list_route

from applications.models import Application
from applications.serializers import ApplicationSerializer

from authentication.permissions import IsAccountOwner


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.order_by('-created_at')
    serializer_class = ApplicationSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return False

    @list_route(permission_classes=[IsAccountOwner])
    def overview(self, request):
        applications = Application.objects.filter(users=request.user,
                                                  organization=request.user.organization,
                                                  archived=False)

        serializer = self.get_serializer(applications, many=True)

        return Response(serializer.data)

    @list_route(permission_classes=[IsAccountOwner])
    def all_accessible(self, request):
        applications = Application.objects.filter(users=request.user,
                                                  organization=request.user.organization)

        serializer = self.get_serializer(applications, many=True)

        return Response(serializer.data)

    @list_route(permission_classes=[IsAccountOwner])
    def archived(self, request):
        applications = Application.objects.filter(organization=request.user.organization,
                                                  archived=True)

        serializer = self.get_serializer(applications, many=True)

        return Response(serializer.data)
