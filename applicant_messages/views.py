from rest_framework import permissions, viewsets
from rest_framework.response import Response

from applicant_messages.models import Message
from applicant_messages.serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.order_by('-created_at')
    serializer_class = MessageSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        return False


def perform_create(self, serializer):
    instance = serializer.save(applicant=self.request.user.curr_applicant)

    return super(MessageViewSet, self).perform_create(serializer)


class ApplicantMessagesViewSet(viewsets.ViewSet):
    queryset = Message.objects.select_related('applicant').all()
    serializer_class = MessageSerializer

    def list(self, request, applicant_id=None):
        queryset = self.queryset.filter(applicant__id=applicant_id)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
