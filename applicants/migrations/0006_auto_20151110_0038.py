# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0005_auto_20151030_0332'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='applicant',
            name='email',
        ),
        migrations.RemoveField(
            model_name='applicant',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='applicant',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='applicant',
            name='source',
        ),
        migrations.AddField(
            model_name='applicant',
            name='data',
            field=models.CharField(default=b'', max_length=2000),
        ),
    ]
