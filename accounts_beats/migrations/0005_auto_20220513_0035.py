# Generated by Django 3.0.8 on 2022-05-12 19:35

import django.core.validators
from django.db import migrations, models
import services.services


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_beats', '0004_auto_20220430_1047'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist',
            name='beat',
            field=models.FileField(upload_to=services.services.get_path_upload_beat, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['mp3']), services.services.validate_size_beat]),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='cart',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
