from rest_framework import permissions, viewsets
from rest_framework.response import Response

from applicant_messages.models import Message
from applicant_messages.serializers import MessageSerializer


class MessagesViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.order_by('-created_at')
    serializer_class = MessageSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return False


    def perform_create(self, serializer):
        instance = serializer.save(sender=self.request.user,
                                   applicant=self.request.data['applicant'])

        return super(MessagesViewSet, self).perform_create(serializer)


class ApplicantMessagesViewSet(viewsets.ViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def list(self, request, applicant_pk=None):
        queryset = self.queryset.filter(applicant__pk=applicant_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
