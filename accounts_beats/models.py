from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import FileExtensionValidator
from services.services import get_path_upload_cover, validate_size_image, get_path_upload_beat, validate_size_beat

class PlayList(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    mp3Price = models.IntegerField()
    wavPrice = models.IntegerField()
    trackout = models.IntegerField()
    unlimited = models.IntegerField()
    bpm = models.IntegerField()
    time = models.IntegerField()
    cover = models.ImageField(upload_to=get_path_upload_cover, blank=False, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'png']), validate_size_image])
    beat = models.FileField(upload_to=get_path_upload_beat, blank=False, null=False, validators=[FileExtensionValidator(allowed_extensions=['mp3']), validate_size_beat])
    tag = models.CharField(max_length=100, blank=False, default='')
    mood = models.CharField(max_length=70, blank=False, default='')
    genre = models.CharField(max_length=70, blank=False, default='')
    link = models.CharField(max_length=70, blank=False, default='')
    plays_count = models.PositiveIntegerField(default=0)
    linkToMp3License = models.CharField(max_length=400, blank=False, default='')
    linkToWavLicense = models.CharField(max_length=400, blank=False, default='')
    linkToFullLicense = models.CharField(max_length=400, blank=False, default='')

    def __str__(self):
        return self.title

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)



class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    cart = models.CharField(max_length=400, blank=True)
    texts = models.CharField(max_length=400, blank=True)
    purchased = models.CharField(max_length=250, blank=True)

    objects = UserAccountManager()


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name


    def __str__(self):
        return self.email

