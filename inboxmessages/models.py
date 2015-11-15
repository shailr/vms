from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applicants.models import Applicant


class InboxMessage(TimeStampedModel):
    message = models.TextField()

    applicant = models.ForeignKey(Applicant, null=True)

    user = models.ForeignKey(Account, null=True)

    read = models.BooleanField(default=False)

    def __unicode__(self):
        return self.message
