# Generated by Django 4.0.3 on 2022-04-30 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('QRcode', '0004_alter_qrcode_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='qrcode',
            name='title',
            field=models.CharField(max_length=20),
        ),
    ]