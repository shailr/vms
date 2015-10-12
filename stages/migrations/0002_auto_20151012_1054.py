# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stages', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stage',
            old_name='creator',
            new_name='assignee',
        ),
    ]
