from rest_framework import serializers

from tags.models import Tag

from applicants.models import Applicant

from applicants.serializers import ApplicantSerializer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag

        fields = ('id', 'tag', 'applicants', 'created_at', 'updated_at')

        read_only_fields = ('id', 'created_at', 'updated_at', 'applicants')

    def get_validation_exclusions(seld, *args, **kwargs):
        exclusions = super(TagSerializer, self).get_validation_exclusions()

        return exclusions + ['applicants']

    def create(self, validated_data):
        applicant = None

        if 'applicant' in validated_data.keys():
            id = validated_data['applicant']['id']
            applicant = Applicant.objects.get(pk=id)

        tag, created = Tag.objects.get_or_create(tag=validated_data['tag'])

        if applicant:
            tag.applicants.add(applicant)

        return tag
