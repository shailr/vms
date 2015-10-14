from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applicants.models import Applicant


class Category(TimeStampedModel):
    name = models.CharField(max_length=20, unique=True)

    created_by = models.ForeignKey(Account)

    applicants = models.ManyToManyField(Applicant)

    def __unicode__(self):
        return self.name
