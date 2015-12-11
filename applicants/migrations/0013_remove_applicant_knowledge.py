# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0012_applicant_knowledge'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='applicant',
            name='knowledge',
        ),
    ]
