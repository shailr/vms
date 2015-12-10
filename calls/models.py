from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applicants.models import Applicant


class Call(TimeStampedModel):
    start_time = models.DateTimeField(auto_now_add=True)

    end_time = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(Account, null=True)

    applicant = models.ForeignKey(Applicant, null=True)

    rating = models.IntegerField(default=0)

    end = models.BooleanField(default=False)

    def __unicode__(self):
        return str(self.id)
