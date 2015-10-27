from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applications.models import Application

from stages.models import Stage


class Applicant(TimeStampedModel):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField()

    SOURCE_CHOICES = (
        (u'1', u'Choice1'),
        (u'2', u'Choice2'),
    )
    source = models.CharField(max_length=1, choices=SOURCE_CHOICES)

    mobile = models.CharField(max_length=20)

    stage = models.ForeignKey(Stage, null=True)

    created_by = models.ForeignKey(Account, null=True)

    application = models.ForeignKey(Application, null=True)

    def __unicode__(self):
        return self.first_name
