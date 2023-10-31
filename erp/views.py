from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required  # Importa el decorador de autenticación
from .forms import CustomLoginForm 

def home(request):
    return render(request, 'html/home.html')

def login_view(request):
    if request.method == 'POST':
        form = CustomLoginForm(request.POST)  # Utiliza el formulario personalizado
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect('erp:menu')  # Redirige a la página de menú después del inicio de sesión
            else:
                return render(request, 'html/login.html', {'form': form, 'error': 'El correo electrónico o la contraseña son incorrectos.'})
    else:
        form = CustomLoginForm()  # Utiliza el formulario personalizado
    return render(request, 'html/login.html', {'form': form})  # Asegúrate de pasar el formulario al contexto

@login_required
def menu_view(request):
    return render(request, 'html/menu.html')

def procesar_formulario(request):
    return redirect('erp:menu')
