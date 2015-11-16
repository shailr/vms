from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account


class MessageTemplate(TimeStampedModel):
    body = models.TextField()

    added_by = models.ForeignKey(Account)

    def __unicode__(self):
        return self.body
