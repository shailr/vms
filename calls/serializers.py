from rest_framework import serializers

from calls.models import Call

from applicants.models import Applicant

from authentication.serializers import AccountSerializer

from applicants.serializers import ApplicantSerializer


class CallSerializer(serializers.ModelSerializer):
    user = AccountSerializer(read_only=True, required=False)
    applicant = ApplicantSerializer(read_only=True, required=False)

    class Meta:
        model = Call

        fields = ('id', 'start_time', 'end_time', 'user', 'applicant', 'created_at', 'updated_at', 'rating', 'end')

        read_only_fields = ('id', 'created_at', 'updated_at', 'applicant', 'user')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(CallSerializer, self).get_validation_exclusions()

        return exclusions + ['user', 'applicant']

    def create(self, validated_data):
        id = validated_data['applicant']['id']
        applicant = Applicant.objects.get(pk=id)

        validated_data['applicant'] = applicant

        return Call.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if 'end' in validated_data.keys():
            instance.end = validated_data['end']

        if 'rating' in validated_data.keys():
            instance.rating = validated_data['rating']

        instance.save()

        return instance
