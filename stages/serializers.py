from rest_framework import serializers

from stages.models import Stage

from applications.models import Application

from authentication.models import Account

from authentication.serializers import AccountSerializer

from applications.serializers import ApplicationSerializer


class StageSerializer(serializers.ModelSerializer):
    assignee = AccountSerializer(read_only=True, required=False)
    application = ApplicationSerializer(read_only=True, required=False)

    class Meta:
        model = Stage
        fields = ('id', 'name', 'assignee', 'created_at', 'updated_at',
                  'application', 'applicant_set', 'default_stage', 'order')
        read_only_fields = ('created_at', 'updated_at', 'assignee',
                            'application', 'applicant_set',)

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(StageSerializer,
                           self).get_validation_exclusions()

        return exclusions + ['assignee', 'application']

    def create(self, validated_data):
        id = validated_data['application']['id']
        assignee_id = validated_data['assignee']['id']
        application = Application.objects.get(pk=id)
        assignee = Account.objects.get(pk=assignee_id)

        validated_data['application'] = application
        validated_data['assignee'] = assignee

        return Stage.objects.create(**validated_data)
