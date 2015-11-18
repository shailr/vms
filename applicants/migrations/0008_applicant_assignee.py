# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('applicants', '0007_auto_20151117_0419'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicant',
            name='assignee',
            field=models.ForeignKey(related_name='applicants', to=settings.AUTH_USER_MODEL, null=True),
        ),
    ]
