from rest_framework import permissions, viewsets
from rest_framework.response import Response

from fields.models import Field
from fields.serializers import FieldSerializer


class FieldViewSet(viewsets.ModelViewSet):
    queryset = Field.objects.order_by('-created_at')
    serializer_class = FieldSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return False


# Need to implement this
# def perform_create(self, serizalizer):
#     instance = serizalizer.save(organization=self.request.organization)

#     return super(ApplicationViewSet, self).perform_create(serializer)

class ApplicationFieldsViewSet(viewsets.ViewSet):
    queryset = Field.objects.select_related('application').all()
    serializer_class = FieldSerializer

    def list(self, request, application=None):
        queryset = self.queryset.filter(application_name=application)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
