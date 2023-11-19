from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, nombre='Nombre Predeterminado', **extra_fields):
        if not email:
            raise ValueError('El campo de correo electrónico es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, nombre=nombre, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, nombre='Administrador', **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Los superusuarios deben tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Los superusuarios deben tener is_superuser=True.')

        return self.create_user(email, password, nombre=nombre, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=255, default='Nombre Predeterminado')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

#-------------------TABLA DE FICHA NAVIO -------------------------------------------------------------------------
class FichaNavio(models.Model):
    ESTADO_CHOICES = [
        ('Terminado', 'Terminado'),
        ('En Proceso', 'En Proceso'),
        ('No Iniciado', 'No Iniciado'),
    ]  
    
    Nave = models.CharField(max_length=255)
    Viaje = models.CharField(max_length=255)
    Puerto = models.CharField(max_length=255)
    Carga = models.CharField(max_length=255)
    Procedencia = models.CharField(max_length=255)
    TipoServicio = models.CharField(max_length=255)
    Armador = models.CharField(max_length=255)
    Agencia = models.CharField(max_length=255)
    ProximoPuerto = models.CharField(max_length=255)
    Encalado = models.CharField(max_length=3, choices=[('Si', 'Si'), ('No', 'No')])
    ETA = models.DateField()
    horaRegistroETA = models.TimeField()
    Bombasumergible = models.CharField(max_length=3, choices=[('Si', 'Si'), ('No', 'No')])
    Cubierta = models.CharField(max_length=3, choices=[('Si', 'Si'), ('No', 'No')])
    ShapeBox = models.CharField(max_length=3, choices=[('Si', 'Si'), ('No', 'No')])
    PCR = models.CharField(max_length=3, choices=[('Si', 'Si'), ('No', 'No')])
    horaRegistroPCR = models.TimeField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    cantidadPersonas = models.IntegerField()
    puerto = models.IntegerField()
    Estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='No Iniciado')
    color = models.CharField(max_length=20, default='#FFFFFF')  


    def __str__(self):
        return self.Nave
    
#----------------------TABLA DE FICHA PERSONAL-----------------------------------------------------------------------------    