from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applicants.models import Applicant


class History(TimeStampedModel):
    message = models.TextField()

    applicant = models.ForeignKey(Applicant)

    user = models.ForeignKey(Account)

    def __unicode__(self):
        return self.message
