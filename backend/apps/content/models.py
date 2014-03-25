from django.db import models
from django.conf import settings


class Content(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    file = models.FileField(
        upload_to='videos/%Y/%m/%d',
        blank=True, null=True,
        )

    class Meta:
        ordering = ('-created',)

    def __unicode__(self):
        return self.title
