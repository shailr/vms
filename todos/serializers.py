from rest_framework import serializers

from todos.models import Todo

from authentication.serializers import AccountSerializer

from applicants.serializers import ApplicantSerializer


class TodoSerializer(serializers.ModelSerializer):
    created_by = AccountSerializer(read_only=True, required=False)
    assignee = AccountSerializer(read_only=True, required=False)
    applicant = ApplicantSerializer(read_only=True, required=False)

    class Meta:
        model = Todo

        fields = ('id', 'todo', 'created_by', 'assignee', 'applicant',
                  'created_at', 'updated_at', 'due_date')

        read_only_fields = ('id', 'created_at', 'updated_at', 'applicant',
                            'created_by', 'assignee')

        def get_validation_exclusions(self, *args, **kwargs):
            exclusions = super(TodoSerializer,
                               self).get_validation_exclusions()

            return exclusions + ['created_by', 'assignee', 'applicant']
