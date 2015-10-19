from rest_framework import permissions, viewsets
from rest_framework.response import Response

from notes.models import Note
from notes.serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.order_by('-created_at')
    serializer_class = NoteSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        return False


def perform_create(self, serializer):
    instance = serializer.save(applicant=self.request.user.curr_applicant)

    return super(NoteViewSet, self).perform_create(serializer)


class NoteViewSet(viewsets.ViewSet):
    queryset = Note.objects.select_related('applicant').all()
    serializer_class = NoteSerializer

    def list(self, request, applicant_id=None):
        queryset = self.queryset.filter(applicant__id=applicant_id)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
