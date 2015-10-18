from django.db import models

from core.models import TimeStampedModel

from organizations.models import Organization
from authentication.models import Account


class Application(TimeStampedModel):
    title = models.CharField(max_length=30, unique=True)
    details = models.TextField()
    archived = models.BooleanField(default=False)

    organization = models.ForeignKey(Organization, null=True)

    users = models.ManyToManyField(Account, related_name='applications')

    creator = models.ForeignKey(Account, null=True)

    def __unicode__(self):
        return self.title
