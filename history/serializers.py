from rest_framework import serializers

from history.models import History

from authentication.serializers import AccountSerializer

from applicants.serializers import ApplicantSerializer
from applicants.models import Applicant


class HistorySerializer(serializers.ModelSerializer):
    applicant = ApplicantSerializer(read_only=True, required=False)
    user = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = History

        fields = ('id', 'message', 'applicant', 'user', 'created_at',
                  'updated_at',)

        read_only_fields = ('id', 'created_at', 'updated_at', 'applicant',
                            'user',)

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(HistorySerializer,
                           self).get_validation_exclusions()

        return exclusions + ['application', 'user']

    def create(self, validated_data):
        id = validated_data['applicant']['id']
        applicant = Applicant.objects.get(pk=id)

        validated_data['applicant'] = applicant

        return History.objects.create(**validated_data)
