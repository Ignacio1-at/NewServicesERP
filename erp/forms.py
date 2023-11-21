from django import forms
from .models import FichaNavio, FichaPersonal, Hijo, FichaHerramientas, FichaQuimico, FichaVehiculo, FichaMantenimiento

class CustomLoginForm(forms.Form):
    email = forms.EmailField(label='E-mail')
    password = forms.CharField(label='Contraseña', widget=forms.PasswordInput)

class FichaNavioForm(forms.ModelForm):
    class Meta:
        model = FichaNavio
        fields = '__all__'

class HijoForm(forms.ModelForm):
    class Meta:
        model = Hijo
        fields = '__all__'

class FichaPersonalForm(forms.ModelForm):
    class Meta:
        model = FichaPersonal
        exclude = ['hijos']

class FichaHerramientasForm(forms.ModelForm):
  class Meta:
      model= FichaHerramientas
      fields = '__all__'

class FichaQuimicoForm(forms.ModelForm):
  class Meta:
      model = FichaQuimico
      fields = '__all__'
      
class FichaVehiculoForm(forms.ModelForm):
  class Meta:
      model = FichaVehiculo
      fields = '__all__'      

class FichaMantenimientoForm(forms.ModelForm):
  class Meta:
      model = FichaMantenimiento
      fields = '__all__'      