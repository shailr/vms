from rest_framework import serializers

from notes.models import Note

from authentication.serializers import AccountSerializer

from applicants.serializers import ApplicantSerializer


class NoteSerializer(serializers.ModelSerializer):
    user = AccountSerializer(read_only=True, required=False)
    applicant = ApplicantSerializer(read_only=True, required=False)

    class Meta:
        model = Note

        fields = ('id', 'note', 'user', 'applicant',
                  'created_at', 'updated_at')

        read_only_fields = ('id', 'created_at', 'updated_at',
                            'applicant', 'user')

        def get_validation_exclusions(self, *args, **kwargs):
            exclusions = super(MessageSerializer,
                               self).get_validation_exclusions()

            return exclusions + ['user', 'applicant']
