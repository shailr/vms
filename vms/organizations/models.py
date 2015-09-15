from django.db import models

class Organization(models.Model):
    name = models.CharField(max_length=40, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.name
