from rest_framework import serializers

from applicants.models import Applicant

from authentication.serializers import AccountSerializer
from authentication.models import Account

from applications.serializers import ApplicationSerializer
from applications.models import Application

from stages.models import Stage
from stages.serializers import StageSerializer

class ApplicantSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer(read_only=True, required=False)
    created_by = AccountSerializer(read_only=True, required=False)
    stage = StageSerializer(required=False)

    class Meta:
        model = Applicant

        fields = ('id', 'data', 'mobile', 'created_by', 'application', 'query', 'info',
                  'created_at', 'starred', 'archived', 'stage', 'assignee', 'number_of_missed_calls')

        read_only_fields = ('id', 'created_at', 'updated_at',
                            'created_by', 'application', 'created_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ApplicationSerializer,
                           self).get_validaion_exclusions()

        return exclusions + ['application', 'created_by', 'stage']

    def create(self, validated_data):
        id = validated_data['application']['id']
        application = Application.objects.get(pk=id)

        stage = Stage.objects.get(default_stage=True)

        validated_data['application'] = application
        validated_data['stage'] = stage
        validated_data['assignee'] = stage.assignee

        return Applicant.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.mobile = validated_data['mobile']
        instance.data = validated_data['data']
        instance.query = validated_data['query']
        instance.info = validated_data['info']
        instance.starred = validated_data['starred']
        instance.archived = validated_data['archived']
        instance.stage = Stage.objects.get(name=validated_data['stage']['name'])
        instance.assignee = validated_data['assignee']

        instance.save()

        return instance
