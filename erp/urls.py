from .views import home, login_view, menu_view, procesar_formulario
from django.urls import path

app_name = 'erp'  

urlpatterns = [
    path('', home, name='home'),
    path('menu/', menu_view, name='menu'),
    path('procesar-formulario/', procesar_formulario, name='procesar-formulario'),
    path('login/', login_view, name='login'),
    # Otras rutas aquí...
]
