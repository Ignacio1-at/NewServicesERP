from django.urls import path, include
from django.contrib import admin
from erp.views import home, login_view, menu_view, procesar_formulario

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('erp/', include('erp.urls')),  # Elimina 'namespace='erp''
    path('erp/menu/', menu_view, name='menu'),
    path('erp/procesar-formulario/', procesar_formulario, name='procesar-formulario'),
    path('login/', login_view, name='login'),
    # Otras rutas aquí...
]
