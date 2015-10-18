# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0005_application_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='users',
            field=models.ManyToManyField(related_name='accounts',
                                         to=settings.AUTH_USER_MODEL),
        ),
    ]
