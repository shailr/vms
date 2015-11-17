from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account


class MessageTemplate(TimeStampedModel):
    title = models.CharField(max_length=30, default="")

    body = models.TextField()

    added_by = models.ForeignKey(Account)

    def __unicode__(self):
        return self.body
