# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stages', '0003_stage_order'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stage',
            name='order',
        ),
        migrations.AddField(
            model_name='stage',
            name='default_stage',
            field=models.BooleanField(default=False),
        ),
    ]
