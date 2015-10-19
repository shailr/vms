from rest_framework import serializers

from applications.models import Application

from organizations.serializers import OrganizationSerializer
from authentication.serializers import AccountSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer(read_only=True, required=False)
    creator = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Application

        fields = ('id', 'title', 'details', 'organization', 'creator')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        return Application.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.details = validated_data.get('details', instance.details)

        instance.save()

        return instance

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ApplicatiionSerializer,
                           self).get_validation_exclusions()

        return exclusions + ['organization', 'users']