from rest_framework import permissions, viewsets
from rest_framework.response import Response

from authentication.models import Account

from message_templates.models import MessageTemplate


class MessageTemplateViewSet(viewsets.ModelViewSet):
    queryset = MessageTemplate.objects.order_by('created_at')
    serializer_class = MessageTemplateSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        if self.request.method == 'POST' or self.request.method == 'PUT':
            return (permissions.AllowAny(),)

        return False

    def perform_create(self, serializer):
        instance = serializer.save(added_by=self.request.user)

        return super(MessageTemplateViewSet, self).perform_create(serializer)
