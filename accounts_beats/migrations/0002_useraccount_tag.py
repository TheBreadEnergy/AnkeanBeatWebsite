# Generated by Django 3.0.8 on 2022-04-15 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_beats', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='tag',
            field=models.CharField(default='', max_length=70),
        ),
    ]