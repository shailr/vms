# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('calls', '0002_call_end'),
    ]

    operations = [
        migrations.AlterField(
            model_name='call',
            name='end_time',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='call',
            name='start_time',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
