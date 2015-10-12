# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_auto_20150926_0750'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='organization',
            field=models.ForeignKey(to='organizations.Organization',
                                    null=True),
        ),
    ]
