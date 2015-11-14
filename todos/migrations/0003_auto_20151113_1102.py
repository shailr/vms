# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0002_auto_20151113_0617'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='assignee',
            field=models.ForeignKey(related_name='todos_assigned', to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AlterField(
            model_name='todo',
            name='created_by',
            field=models.ForeignKey(related_name='todos_created', to=settings.AUTH_USER_MODEL, null=True),
        ),
    ]
