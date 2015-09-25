from rest_framework import serializers

from organizations.models import Organization


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization

        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        return Organization.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.location = validated_data.get('location', instance.location)

        instance.save()

        return instance
