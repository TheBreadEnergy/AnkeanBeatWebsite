# Generated by Django 3.0.8 on 2022-06-22 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_beats', '0006_auto_20220524_2110'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='texts',
            field=models.CharField(blank=True, max_length=400),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='cart',
            field=models.CharField(blank=True, max_length=400),
        ),
    ]
