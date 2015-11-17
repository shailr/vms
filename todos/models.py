from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applicants.models import Applicant

from datetime import datetime


class Todo(TimeStampedModel):
    todo = models.TextField()

    created_by = models.ForeignKey(Account, related_name='todos_created', null=True)

    assignee = models.ForeignKey(Account, null=True, related_name='todos_assigned')

    applicant = models.ForeignKey(Applicant, null=True)

    done = models.BooleanField(default=False)

    due_date = models.DateTimeField(default=datetime.now, blank=True)

    def __unicode__(self):
        return self.todo
