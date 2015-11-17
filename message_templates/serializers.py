from rest_framework import serializers

from message_templates.models import MessageTemplate

from authentication.serializers import AccountSerializer


class MessageTemplateSerializer(serializers.ModelSerializer):
    added_by = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = MessageTemplate

        fields = ('id', 'body', 'added_by', 'created_at', 'updated_at', 'title')

        read_only_fields = ('id', 'created_at', 'updated_at', 'added_by')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(MessageTemplateSerializer,
                           self).get_validation_exclusions()

        return exclusions + ['added_by']
