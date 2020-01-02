from django.db import models

# Create your models here.
class DNA_Sequence(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    sequence = models.TextField()

    def __str__(self):
        return self.name