from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bid_app', '0011_auctionuser_account_number_auctionuser_adhar_card_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='auctionuser',
            name='adhar_card',
        ),
        migrations.RemoveField(
            model_name='auctionuser',
            name='adhar_number',
        ),
        migrations.RemoveField(
            model_name='auctionuser',
            name='pan_card',
        ),
        migrations.RemoveField(
            model_name='auctionuser',
            name='pan_number',
        ),
    ] 