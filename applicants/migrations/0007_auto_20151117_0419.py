# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0006_auto_20151110_0038'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicant',
            name='archived',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='applicant',
            name='starred',
            field=models.BooleanField(default=False),
        ),
    ]
