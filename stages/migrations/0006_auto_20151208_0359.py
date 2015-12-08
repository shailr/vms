# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stages', '0005_stage_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stage',
            name='name',
            field=models.CharField(max_length=30),
        ),
    ]
