# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applicant_messages', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='type',
        ),
    ]
