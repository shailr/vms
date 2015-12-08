# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0010_auto_20151126_0525'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicant',
            name='number_of_missed_calls',
            field=models.IntegerField(default=0),
        ),
    ]
