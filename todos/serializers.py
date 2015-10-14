from rest_framework import serializers

from todos.models import Todo

from authentication.serializers import AccountSerializer

from applicants.serializers import ApplicantSerializer
from applicants.models import Applicant


class TodoSerializer(serializers.ModelSerializer):
    created_by = AccountSerializer(read_only=True, required=False)
    assignee = AccountSerializer(read_only=True, required=False)
    applicant = ApplicantSerializer(read_only=True, required=False)

    class Meta:
        model = Todo

        fields = ('id', 'todo', 'created_by', 'assignee',
                  'created_at', 'updated_at')

        read_only_fields = ('id', 'created_at', 'updated_at',
                            'created_by', 'assignee')

        def get_validation_exclusions(self, *args, **kwargs):
            exclusions = super(TodoSerializer,
                               self).get_validation_exclusions()

            return exclusions + ['created', 'assignee', 'applicant']
