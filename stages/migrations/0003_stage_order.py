# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stages', '0002_auto_20151023_0647'),
    ]

    operations = [
        migrations.AddField(
            model_name='stage',
            name='order',
            field=models.IntegerField(default=0),
        ),
    ]
