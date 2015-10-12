from rest_framework import serializers

from organizations.models import Organization


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization

        fields = ('id', 'name', 'phone', 'location',
                  'created_at', 'updated_at',)
        read_only_fields = ('id', 'created_at', 'updated_at',)
