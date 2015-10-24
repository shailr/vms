# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0002_auto_20151023_0647'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicant',
            name='application',
            field=models.ForeignKey(to='applications.Application', null=True),
        ),
        migrations.AlterField(
            model_name='applicant',
            name='created_by',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True),
        ),
    ]
