from django.db import models

from core.models import TImeStampedModel

from applications.models import Application


class Field(TimeStampedModel):
    name = models.CharField(max_length=20, unique=True)
    type = models.CharField(max_length=20)
    value = models.TextField()
    sr_no = models.IntegerField()
    data_src = models.CharField(max_lenth=100, blank=True)

    application = models.ForeignKey(Application)

    def __unicode__(self):
        return self.name
