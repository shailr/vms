from rest_framework import serializers

from categories.models import Category

from authentication.serializers import AccountSerializer

from applicants.serializers import ApplicantSerializer


class CategorySerializer(serializers.ModelSerializer):
    created_by = AccountSerializer(read_only=True, required=False)
    applicant = ApplicantSerializer(read_only=True, required=False, many=True)

    class Meta:
        model = Category

        fields = ('id', 'name', 'created_at', 'updated_at',
                  'created_by', 'applicant',)

        read_only_fields = ('id', 'created_at', 'updated_at',
                            'created_by', 'applicant',)

        def get_validation_exclusions(self, *args, **kwargs):
            exclusions = super(CategorySerializer,
                               self).get_validation_exclusions()

            return exclusions + ['created_by']
