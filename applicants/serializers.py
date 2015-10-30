from rest_framework import serializers

from applicants.models import Applicant

from authentication.serializers import AccountSerializer

from applications.serializers import ApplicationSerializer
from applications.models import Application


class ApplicantSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer(read_only=True, required=False)
    created_by = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Applicant

        fields = ('id', 'first_name', 'last_name', 'email', 'source',
                  'mobile', 'created_by', 'application', 'created_at', 'message_set',)

        read_only_fields = ('id', 'created_at', 'updated_at', 'message_set',
                            'created_by', 'application', 'created_at',)

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ApplicationSerializer,
                           self).get_validaion_exclusions()

        return exclusions + ['application', 'created_by']

    def create(self, validated_data):
        id = validated_data['application']['id']
        application = Application.objects.get(pk=id)

        validated_data['application'] = application

        return Applicant.objects.create(**validated_data)
