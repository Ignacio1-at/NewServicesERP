from django import forms
from .models import FichaNavio, FichaPersonal, Hijo

class CustomLoginForm(forms.Form):
    email = forms.EmailField(label='E-mail')
    password = forms.CharField(label='Contraseña', widget=forms.PasswordInput)

class FichaNavioForm(forms.ModelForm):
    class Meta:
        model = FichaNavio
        fields = '__all__'
        
class FichaPersonalForm(forms.ModelForm):
    class Meta:
        model = FichaPersonal
        fields = '__all__'

class HijoForm(forms.ModelForm):
    class Meta:
        model = Hijo
        fields = '__all__'