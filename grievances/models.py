from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applicants.models import Applicant


class Grievance(TimeStampedModel):
    note = models.TextField()

    user = models.ForeignKey(Account)

    applicant = models.ForeignKey(Applicant)

    def __unicode__(self):
        return self.note
