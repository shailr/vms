# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0008_applicant_assignee'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicant',
            name='assignee',
            field=models.ForeignKey(related_name='applicants_assigned', to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AlterField(
            model_name='applicant',
            name='created_by',
            field=models.ForeignKey(related_name='applicants_created', to=settings.AUTH_USER_MODEL, null=True),
        ),
    ]
