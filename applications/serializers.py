
from rest_framework import serializers

from applications.models import Application

from organizations.serializers import OrganizationSerializer
from authentication.serializers import AccountSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer(read_only=True, required=False)
    creator = AccountSerializer(read_only=True, required=False)
    users = AccountSerializer(read_only=True, required=False, many=True)

    class Meta:
        model = Application

        fields = ('id', 'title', 'details', 'organization',
                  'creator', 'archived', 'users', 'applicant_set')
        read_only_fields = ('id', 'organization', 'users', 'applicant_set'
                            'created_at', 'updated_at',)

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ApplicatiionSerializer,
                           self).get_validation_exclusions()

        return exclusions + ['organization', 'users', 'creator']
