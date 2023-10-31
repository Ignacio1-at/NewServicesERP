from django import forms

class CustomLoginForm(forms.Form):
    email = forms.EmailField(label='E-mail')
    password = forms.CharField(label='Contraseña', widget=forms.PasswordInput)
