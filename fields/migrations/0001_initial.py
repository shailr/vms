# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Field',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(unique=True, max_length=20)),
                ('type', models.CharField(max_length=20)),
                ('value', models.TextField()),
                ('sr_no', models.IntegerField()),
                ('data_src', models.CharField(max_length=100, blank=True)),
                ('application', models.ForeignKey(to='applications.Application')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
