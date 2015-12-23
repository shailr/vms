from rest_framework import serializers

from locations.models import Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location

        fields = ('id', 'created_at', 'updated_at', 'address')
