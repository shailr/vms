from django.db import models

from core.models import TimeStampedModel

from applicants.models import Applicant


class Tag(TimeStampedModel):
    tag = models.CharField(max_length=20, unique=True)

    applicants = models.ManyToManyField(Applicant, related_name='tags')

    def __unicode__(self):
        return self.tag
