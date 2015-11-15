from rest_framework import permissions, viewsets
from rest_framework.response import Response

from inboxmessages.models import InboxMessage
from inboxmessages.serializers import InboxMessageSerializer


class InboxMessageViewSet(viewsets.ModelViewSet):
    queryset = InboxMessage.objects.order_by('created_at')
    serializer_class = InboxMessageSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST' or self.request.method == 'PUT':
            return (permissions.AllowAny(),)

        return False

    def perform_create(self, serializer):
        instance = serializer.save(applicant=self.request.data['applicant'],
                                   user=self.request.data['user'])

        return super(InboxMessageViewSet, self).perform_create(serializer)


class AccountInboxMessageViewSet(viewsets.ViewSet):
    queryset = InboxMessage.objects.all()
    serializer_class = InboxMessageSerializer

    def list(self, request, account_pk=None):
        queryset = self.queryset.filter(user__pk=account_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
