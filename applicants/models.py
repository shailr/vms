from django.db import models

from core.models import TimeStampedModel

from authentication.models import Account

from applications.models import Application

from stages.models import Stage


class Applicant(TimeStampedModel):
    mobile = models.CharField(max_length=20)

    number_of_missed_calls = models.IntegerField(default=0)

    data = models.CharField(max_length=2000, default='{"address": {}, "birth": {}, "income": {}, "category": {}, "disability": {}, "orphan": {}, "number_children": 0, "children": []}')

    query = models.CharField(max_length=1000, default='{}')

    info = models.CharField(max_length=1000, default='{}')

    stage = models.ForeignKey(Stage, null=True)

    starred = models.BooleanField(default=False)

    archived = models.BooleanField(default=False)

    assignee = models.ForeignKey(Account, related_name='applicants_assigned', null=True)

    created_by = models.ForeignKey(Account, null=True, related_name='applicants_created')

    application = models.ForeignKey(Application, null=True)

    def __unicode__(self):
        return self.mobile
