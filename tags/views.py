from rest_framework import permissions, viewsets
from rest_framework.response import Response

from tags.models import Tag
from tags.serializers import TagSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.order_by('-created_at')
    serializer_class = TagSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

    def perform_create(self, serializer):
        instance = serializer.save(applicants=self.request.data['applicants'])

        return super(TagViewSet, self).perform_create(serializer)


class ApplicantTagsViewSet(viewsets.ViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def list(self, request, applicant_pk=None):
        queryset = self.queryset.filter(applicants__id=applicant_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
