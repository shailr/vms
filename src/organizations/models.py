from django.db import models

from core.models import TimeStampedModel


class Organization(TimeStampedModel):
    name = models.CharField(max_length=40, unique=True)
    phone = models.CharField(max_lenght=20)
    location = models.CharField(max_length=40)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.name
