# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0013_remove_applicant_knowledge'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicant',
            name='data',
            field=models.CharField(default=b'{"address": {}, "birth": {}, "income": {}, "category": {}, "disability": {}, "orphan": {}, "number_children": 0, "children": []}', max_length=2000),
        ),
        migrations.AlterField(
            model_name='applicant',
            name='info',
            field=models.CharField(default=b'{}', max_length=1000),
        ),
        migrations.AlterField(
            model_name='applicant',
            name='query',
            field=models.CharField(default=b'{}', max_length=1000),
        ),
    ]
