# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stages', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stage',
            name='application',
            field=models.ForeignKey(to='applications.Application', null=True),
        ),
    ]
