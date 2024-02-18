# Generated by Django 5.0.1 on 2024-02-18 14:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('notifications', '0001_initial'),
        ('rent', '0001_initial'),
        ('stations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='rent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to='rent.rent'),
        ),
        migrations.AddField(
            model_name='notification',
            name='response_notification',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='response', to='notifications.notification'),
        ),
        migrations.AddField(
            model_name='notification',
            name='station',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to='stations.station'),
        ),
    ]
