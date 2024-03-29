# Generated by Django 3.0.8 on 2022-04-30 05:47

import django.core.validators
from django.db import migrations, models
import services.services


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_beats', '0003_auto_20220415_1816'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist',
            name='cover',
            field=models.ImageField(upload_to=services.services.get_path_upload_cover, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['jpg', 'png']), services.services.validate_size_image]),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='cart',
            field=models.CharField(max_length=70),
        ),
    ]
