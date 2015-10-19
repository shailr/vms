from rest_framework import serializers

from applicants.models import Applicant

from authentication.serializers import AccountSerializer

from applications.serializers import ApplicationSerializer


class ApplicantSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer(read_only=True, required=False)
    created_by = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Applicant

        fields = ('id', 'first_name', 'last_name', 'email', 'source',
                  'mobile', 'created_by', 'application',)

        read_only_fields = ('id', 'created_at', 'updated_at',
                            'created_by', 'application',)

        def get_validation_exclusions(self, *args, **kwargs):
            exclusions = super(ApplicationSerializer,
                               self).get_validaion_exclusions()

            return exclusions + ['application', 'created_by']
