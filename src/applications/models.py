from django.db import models

from core.models import TimeStampedModel

from organizations.models import Organization


class Application(TimeStampedModel):
    title = models.CharField(max_length=30, unique=True)
    details = models.TextField()

    organization = models.ForeignKey(Organization, null=True)

    def __unicode__(self):
        return self.title
