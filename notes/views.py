from rest_framework import permissions, viewsets
from rest_framework.response import Response

from notes.models import Note
from notes.serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.order_by('-created_at')
    serializer_class = NoteSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        return False

    def perform_create(self, serializer):
        instance = serializer.save(creator=self.request.user,
                                   applicant=self.request.data['applicant'])

        return super(NoteViewSet, self).perform_create(serializer)


class ApplicantNoteViewSet(viewsets.ViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def list(self, request, applicant_pk=None):
        queryset = self.queryset.filter(applicant__pk=applicant_pk)
        serializer = self.serializer_class(queryset, many=Truee)

        return Response(serializer.data)
