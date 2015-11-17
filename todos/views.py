from rest_framework import permissions, viewsets
from rest_framework.response import Response

from todos.models import Todo
from todos.serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.order_by('-created_at')
    serializer_class = TodoSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST' or self.request.method == 'PUT':
            return (permissions.AllowAny(),)

        return False


    def perform_create(self, serializer):
        instance = serializer.save(created_by=self.request.user,
                                   assignee=self.request.data['assignee'],
                                   applicant=self.request.data['applicant'])

        return super(TodoViewSet, self).perform_create(serializer)


class ApplicantTodosViewSet(viewsets.ViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def list(self, request, applicant_pk=None):
        queryset = self.queryset.filter(applicant__pk=applicant_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
