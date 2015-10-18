# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0006_auto_20151016_0326'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='users',
            field=models.ManyToManyField(related_name='applications',
                                         to=settings.AUTH_USER_MODEL),
        ),
    ]
