# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='applicant',
            name='stage',
        ),
        migrations.AlterField(
            model_name='applicant',
            name='application',
            field=models.ForeignKey(to='applications.Application'),
        ),
    ]
