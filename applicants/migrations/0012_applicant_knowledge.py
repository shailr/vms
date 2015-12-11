# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0011_applicant_number_of_missed_calls'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicant',
            name='knowledge',
            field=models.CharField(default=b'', max_length=1000),
        ),
    ]
