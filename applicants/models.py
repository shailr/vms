from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applications.models import Application


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

    created_by = models.ForeignKey(Account)

    application = models.ForeignKey(Application)

    def __unicode__(self):
        return self.first_name
