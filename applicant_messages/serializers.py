from rest_framework import serializers

from applicant_messages.models import Message

from applicants.models import Applicant

from authentication.serializers import AccountSerializer

from applicants.serializers import ApplicantSerializer


class MessageSerializer(serializers.ModelSerializer):
    sender = AccountSerializer(read_only=True, required=False)
    applicant = ApplicantSerializer(read_only=True, required=False)

    class Meta:
        model = Message

        fields = ('id', 'message', 'sender', 'applicant',
                  'created_at', 'updated_at', 'type')

        read_only_fields = ('id', 'created_at', 'updated_at',
                            'applicant', 'sender')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(MessageSerializer,
                           self).get_validation_exclusions()

        return exclusions + ['sender', 'applicant']

    def create(self, validated_data):
        id = validated_data['applicant']['id']
        applicant = Applicant.objects.get(pk=id)

        validated_data['applicant'] = applicant

        return Message.objects.create(**validated_data)
