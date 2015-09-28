from rest_framework import serializers

from applications.models import Application

from organizations.serializers import OrganizationSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer(read_only=True, required=False)

    class Meta:
        model = Application

        fields = ('id', 'title', 'details', 'organization')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        return Application.objects.create(**validated_data)

    def update(seld, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.details = validated_data.get('details', instance.details)

        instance.save()

        return instance

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PostSerializer, self).get_validation_exclusions()

        return exclusions + ['organization']
