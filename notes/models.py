from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applicants.models import Applicant


class Note(TimeStampedModel):
    note = models.TextField()

    creator = models.ForeignKey(Account)

    applicant = models.ForeignKey(Applicant)

    def __unicode__(self):
        return self.note
