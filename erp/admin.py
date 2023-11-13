from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'get_nombre', 'is_active', 'is_staff')
    list_filter = ('is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información Personal', {'fields': ('nombre',)}),  # Añade el campo 'nombre' aquí
        ('Permissions', {'fields': ('is_active', 'is_staff')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'nombre'),  # Agrega 'nombre'
        }),
    )
    
    def get_nombre(self, obj):
        return obj.nombre
    
    get_nombre.short_description = 'Nombre'
    
    search_fields = ('email', 'nombre')  # Permite buscar por 'nombre'
    ordering = ('email',)

admin.site.register(CustomUser, CustomUserAdmin)
