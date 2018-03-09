from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    empty_value_display = 'unknown'
    list_display = ('__str__', 'email', 'date_joined', 'is_staff',)
    list_display_links = ('__str__', 'email',)
    list_filter = ('is_staff', 'date_joined',)
    readonly_fields = ('last_login',)
    search_fields = ('first_name', 'last_name', 'email',)
