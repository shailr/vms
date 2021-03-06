from django.db import models

from core.models import TimeStampedModel

from applications.models import Application

from authentication.models import Account


class Stage(TimeStampedModel):
    name = models.CharField(max_length=30)

    application = models.ForeignKey(Application, null=True)

    assignee = models.ForeignKey(Account, null=True)

    default_stage = models.BooleanField(default=False)

    order = models.IntegerField(default=0)

    def __unicode__(self):
        return self.name
