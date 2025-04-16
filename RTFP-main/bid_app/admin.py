from django.contrib import admin
from .models import *

# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon', 'description')
    search_fields = ('name',)
    list_filter = ('name',)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'brand', 'model', 'condition', 'min_price', 'status', 'user')
    search_fields = ('name', 'brand', 'model')
    list_filter = ('category', 'status', 'condition')

class AuctionUserAdmin(admin.ModelAdmin):
    list_display = ('user', 'user_type', 'status', 'contact', 'email_verification')
    search_fields = ('user__username', 'user__email', 'contact')
    list_filter = ('user_type', 'status', 'email_verification')

class ParticipantsAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'new_price')
    search_fields = ('user__username', 'product__name')
    list_filter = ('product',)

class ParticipantsHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'new_price', 'created')
    search_fields = ('user__username', 'product__name')
    list_filter = ('product', 'created')

admin.site.register(Member_fee)
admin.site.register(AuctionUser, AuctionUserAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Participants, ParticipantsAdmin)
admin.site.register(ParticipantsHistory, ParticipantsHistoryAdmin)
