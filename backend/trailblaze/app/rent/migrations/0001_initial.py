# Generated by Django 5.0.1 on 2024-02-05 17:45

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bikes', '0001_initial'),
        ('slots', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Rent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateTimeField(auto_now_add=True)),
                ('end_date', models.DateTimeField()),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(max_length=50)),
                ('lat', models.CharField(max_length=150)),
                ('lng', models.CharField(max_length=150)),
                ('bike', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bike', to='bikes.bike')),
                ('collection_slot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='collection_slot', to='slots.slot')),
                ('return_slot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='return_slot', to='slots.slot')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]