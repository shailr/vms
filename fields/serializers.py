from rest_framework import serializers

from fields.models import Field


class FieldSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer(read_only=True, required=False)

    class Meta:
        model = Field

        fields = ('id', 'name', 'type', 'value', 'sr_no',
                  'data_src', 'application')
        read_only_fields = ('id', 'created_at', 'updated_at', 'application')

    def create(self, validated_data):
        return Field.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.type = validated_data.get('type', instance.type)
        instance.value = validated_data.get('value', instance.value)
        instance.sr_no = validated_data.get('sr_no', instance.sr_no)

        instance.save()

        return instance

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(FieldSerializer, self).get_validation_exclusions()

        return exclusions + ['application']
