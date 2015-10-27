# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stages', '0002_auto_20151023_0647'),
        ('applicants', '0003_auto_20151023_0658'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicant',
            name='stage',
            field=models.ForeignKey(to='stages.Stage', null=True),
        ),
    ]
