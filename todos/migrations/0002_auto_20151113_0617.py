# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0006_auto_20151110_0038'),
        ('todos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='applicant',
            field=models.ForeignKey(to='applicants.Applicant', null=True),
        ),
        migrations.AlterField(
            model_name='todo',
            name='assignee',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AlterField(
            model_name='todo',
            name='created_by',
            field=models.ForeignKey(related_name='creator', to=settings.AUTH_USER_MODEL, null=True),
        ),
    ]
