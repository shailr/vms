from rest_framework import serializers

from notes.models import Note

from applicants.models import Applicant

from authentication.serializers import AccountSerializer

from applicants.serializers import ApplicantSerializer


class NoteSerializer(serializers.ModelSerializer):
    creator = AccountSerializer(read_only=True, required=False)
    applicant = ApplicantSerializer(read_only=True, required=False)

    class Meta:
        model = Note

        fields = ('id', 'note', 'creator', 'applicant', 'created_at', 'updated_at')

        read_only_fields = ('id', 'created_at', 'updated_at', 'applicant', 'creator')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(NoteSerializer, self).get_validation_exclusions()

        return exclusion + ['creator', 'applicant']

    def create(self, validated_data):
        id = validated_data['applicant']['id']
        applicant = Applicant.objects.get(pk=id)

        validated_data['applicant'] = applicant

        return Note.objects.create(**validated_data)
