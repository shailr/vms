from rest_framework import serializers

from applicants.models import Applicant

from authentication.serializers import AccountSerializer

from applications.serializers import ApplicationSerializer
from applications.models import Application

from stages.models import Stage

class ApplicantSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer(read_only=True, required=False)
    created_by = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Applicant

        fields = ('id', 'data', 'mobile', 'created_by', 'application', 'created_at',)

        read_only_fields = ('id', 'created_at', 'updated_at',
                            'created_by', 'application', 'created_at',)

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ApplicationSerializer,
                           self).get_validaion_exclusions()

        return exclusions + ['application', 'created_by']

    def create(self, validated_data):
        id = validated_data['application']['id']
        application = Application.objects.get(pk=id)

        stage = Stage.objects.get(application=application, order=0)

        validated_data['application'] = application
        validated_data['stage'] = stage

        return Applicant.objects.create(**validated_data)
