from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from authentication.models import Account

from organizations.serializers import OrganizationSerializer


class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)
    organization = OrganizationSerializer(read_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'email', 'created_at', 'updated_at',
                  'first_name', 'last_name', 'mobile', 'organization',
                  'password', 'confirm_password', 'stage_set', 'todos_assigned')
        read_only_fields = ('created_at', 'updated_at', 'organization', 'stage_set', 'todos_assigned')

    def get_validation_exclsions(self, *args, **kwargs):
        exclusions = super(AccountSerializer,
                               self).get_validation_exclusions()

        return exclusions + ['organization']

    def create(self, validated_data):
        return Account.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name',
                                                 instance.first_name)
        instance.last_name = validated_data.get('last_name',
                                                instance.last_name)
        instance.mobile = validated_data.get('mobile', instance.mobile)
        instance.organization = validated_data.get('organization',
                                                       instance.organization)

        instance.save()

        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            instance.set_password(password)
            instance.save()

        update_session_auth_hash(self.context.get('request'), instance)

        return instance
