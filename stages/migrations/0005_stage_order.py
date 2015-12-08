# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stages', '0004_auto_20151207_2344'),
    ]

    operations = [
        migrations.AddField(
            model_name='stage',
            name='order',
            field=models.IntegerField(default=0),
        ),
    ]
