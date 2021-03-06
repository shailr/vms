# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('stages', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('applications', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Applicant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('first_name', models.CharField(max_length=20)),
                ('last_name', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
                ('source', models.CharField(max_length=1, choices=[('1', 'Choice1'), ('2', 'Choice2')])),
                ('mobile', models.CharField(max_length=20)),
                ('application', models.ForeignKey(related_name='applicants', to='applications.Application')),
                ('created_by', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('stage', models.ForeignKey(related_name='applicants', to='stages.Stage')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
