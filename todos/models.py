from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applicants.models import Applicant


class Todo(TimeStampedModel):
    todo = models.TextField()

    created_by = models.ForeignKey(Account, related_name='creator')

    assignee = models.ForeignKey(Account)

    def __unicode__(self):
        return self.todo
