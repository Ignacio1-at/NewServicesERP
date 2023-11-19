from django import forms
from .models import FichaNavio

class CustomLoginForm(forms.Form):
    email = forms.EmailField(label='E-mail')
    password = forms.CharField(label='Contraseña', widget=forms.PasswordInput)

class FichaNavioForm(forms.ModelForm):
    class Meta:
        model = FichaNavio
        fields = '__all__'
        
