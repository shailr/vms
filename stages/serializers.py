from rest_framework import serializers

from stages.models import Stage

from authentication.serializers import AccountSerializer

from applications.serializers import ApplicationSerializer


class StageSerializer(serializers.ModelSerializer):
    assignee = AccountSerializer(read_only=True, required=False)
    application = ApplicationSerializer(read_only=True, required=False)

    class Meta:
        model = Stage
        fields = ('id', 'name', 'assignee', 'created_at', 'updated_at',
                  'application',)
        read_only_fields = ('created_at', 'updated_at', 'assignee',
                            'application',)

        def get_validation_exclusions(self, *args, **kwargs):
            exclusions = super(StageSerializer,
                               self).get_validation_exclusions()

            return exclusions + ['assignee', 'application']
