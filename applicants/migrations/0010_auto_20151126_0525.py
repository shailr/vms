# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0009_auto_20151120_1121'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicant',
            name='info',
            field=models.CharField(default=b'', max_length=1000),
        ),
        migrations.AddField(
            model_name='applicant',
            name='query',
            field=models.CharField(default=b'', max_length=1000),
        ),
    ]
