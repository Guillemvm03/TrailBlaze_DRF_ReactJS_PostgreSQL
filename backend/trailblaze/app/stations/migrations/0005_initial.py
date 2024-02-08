from django.db import migrations, models
import django.db.models.deletion



class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [

        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(editable=False, max_length=50, unique=True)),
                ('station_name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=100)),
                ('lat', models.CharField(max_length=150)),
                ('lng', models.CharField(max_length=150)),
                ('capacity', models.IntegerField()),
                ('image', models.CharField(max_length=150)),
            ],
        )
    ]