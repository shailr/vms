# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0003_application_creator'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='archived',
            field=models.BooleanField(default=False),
        ),
    ]
