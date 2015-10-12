from django.db import models

from core.models import TimeStampedModel


class Organization(TimeStampedModel):
    name = models.CharField(max_length=40, unique=True)
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=40, blank=True)

    def __unicode__(self):
        return self.name
