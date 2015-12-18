from rest_framework import serializers

from inboxmessages.models import InboxMessage

from authentication.serializers import AccountSerializer
from authentication.models import Account

from applicants.serializers import ApplicantSerializer
from applicants.models import Applicant


class InboxMessageSerializer(serializers.ModelSerializer):
    applicant = ApplicantSerializer(read_only=True, required=False)
    user = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = InboxMessage

        field = ('id', 'message', 'applicant', 'user', 'created_at', 'updated_at',)

        read_only_fields = ('id', 'created_at', 'updated_at', 'applicant', 'user',)

    def get_validate_exclusions(self, *args, **kwargs):
        exclusions = super(InboxMessageSerializer,
                           self).get_validation_exclusions()

        return exclusions + ['applicant', 'user']

    def create(self, validated_data):
        id = validated_data['applicant']['id']
        user_id = validated_data['user']

        applicant = Applicant.objects.get(pk=id)
        user = Account.objects.get(pk=user_id)

        validated_data['applicant'] = applicant
        validated_data['user'] = user

        return InboxMessage.objects.create(**validated_data)
