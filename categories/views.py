from rest_framework import permissions, viewsets
from rest_framework.response import Response

from categories.models import Categpry
from categories.serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.order_by('-created_at')
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        return False


def perform_create(self, serailizer):
    instance = serializer.save(applicant=self.request.user.curr_applicant)

    return super(CategoryViewSet, self).perform_create(serializer)


class ApplicantCategoriesViewSet(viewsets.ViewSet):
    queryset = Category.objects.select_related('applicant').all()
    serializer_class = CategorySerializer

    def list(self, request, applicant_id=None):
        queryset = self.queryset.filter(applicant__id=applicant_id)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
