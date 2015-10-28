from rest_framework import serializers

from applications.models import Application

from organizations.serializers import OrganizationSerializer
from authentication.serializers import AccountSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer(read_only=True, required=False)
    creator = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Application

        fields = ('id', 'title', 'details', 'organization',
                  'creator', 'archived', 'applicant_set', 'stage_set',
                  'created_at', 'updated_at',)
        read_only_fields = ('id', 'organization', 'applicant_set',
                            'created_at', 'updated_at', 'stage_set',)

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ApplicatiionSerializer,
                           self).get_validation_exclusions()

        return exclusions + ['organization', 'creator']
