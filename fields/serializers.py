from rest_framework import serializers

from fields.models import Field

from applications.serializers import ApplicationSerializer


class FieldSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer(read_only=True, required=False)

    class Meta:
        model = Field

        fields = ('id', 'name', 'type', 'value', 'sr_no',
                  'data_src', 'application')
        read_only_fields = ('id', 'created_at', 'updated_at', 'application')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(FieldSerializer, self).get_validation_exclusions()

        return exclusions + ['application']
