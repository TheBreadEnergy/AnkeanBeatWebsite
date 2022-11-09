from django.core.exceptions import ValidationError


def get_path_upload_cover( file):
    """ road to the file : (media)/cover/cover.png"""
    return f'cover/{file}'


def validate_size_image(file_obj):
    megabyte_limit = 10
    if file_obj.size > megabyte_limit * 1024 * 1024:
        raise ValidationError(f"Max size file: {megabyte_limit} mb")


def get_path_upload_beat(instance, file):
    """ road to the file : (media)/beats/beat.mp3"""
    return f'beats/{file}'


def validate_size_beat(file_obj):
    megabyte_limit = 15
    if file_obj.size > megabyte_limit * 1024 * 1024:
        raise ValidationError(f"Max size file: {megabyte_limit} mb")
