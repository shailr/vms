from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applicants.models import Applicant


class Call(TimeStampedModel):
    end = models.BooleanField(default=False)

    user = models.ForeignKey(Account, null=True)

    applicant = models.ForeignKey(Applicant, null=True)

    def __unicode__(self):
        return self.applicant
