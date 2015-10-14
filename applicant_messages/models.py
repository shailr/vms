from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applicants.models import Applicant


class Message(TimeStampedModel):
    message = models.TextField()

    sender = models.ForeignKey(Account)

    applicant = models.ForeignKey(Applicant)

    TYPE_CHOICES = (
        (u'1', u'sms'),
        (u'2', u'email'),
    )
    type = models.CharField(max_length=1, choices=TYPE_CHOICES)

    def __unicode__(self):
        return self.message
