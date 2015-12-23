from django.db import models

from core.models import TimeStampedModel

class Location(TimeStampedModel):
    address = models.TextField()

    def __unicode__(self):
        return self.address
