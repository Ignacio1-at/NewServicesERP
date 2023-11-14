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

    def __str__(self):
        return self.Nave
    
#----------------------TABLA DE FICHA PERSONAL-----------------------------------------------------------------------------    
class FichaPersonal(models.Model):
    # Sección Datos Personales
    apellido_paterno = models.CharField(max_length=255)
    apellido_materno = models.CharField(max_length=255)
    nombres = models.CharField(max_length=255)
    rut = models.CharField(max_length=12)  # Puedes ajustar la longitud según tus necesidades

    ESTADO_CIVIL_CHOICES = [
        ('Soltero', 'Soltero'),
        ('Casado', 'Casado'),
        ('Viudo', 'Viudo'),
    ]
    estado_civil = models.CharField(max_length=10, choices=ESTADO_CIVIL_CHOICES)
    nacionalidad = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    comuna = models.CharField(max_length=255)
    correo_electronico = models.EmailField()
    celular = models.CharField(max_length=20)  # Puedes ajustar la longitud según tus necesidades
    fecha_nacimiento = models.DateField()

    # Sección Antecedentes Previsionales
    afp = models.CharField(max_length=255)
    salud = models.CharField(max_length=255)
    otros_previsionales = models.CharField(max_length=255)

    # Sección Antecedentes Bancarios
    tipo_cuenta = models.CharField(max_length=255)
    numero_cuenta = models.CharField(max_length=255)
    BANCO_CHOICES = [
        ('', 'Selecciona Banco'),
        ('BCI', 'BCI'),
        ('Banco Estado', 'Banco Estado'),
    ]
    banco = models.CharField(max_length=20, choices=BANCO_CHOICES)

    # Sección Contacto en Caso de Emergencia
    contacto_emergencia_nombre = models.CharField(max_length=255)
    contacto_emergencia_celular = models.CharField(max_length=20)  # Puedes ajustar la longitud según tus necesidades
    contacto_emergencia_parentesco = models.CharField(max_length=255)

    # Sección Solicitud EPP
    talla_polera = models.CharField(max_length=2)
    talla_pantalon = models.CharField(max_length=2)
    calzado_seguridad = models.IntegerField()
    talla_overol = models.CharField(max_length=2)
    talla_traje_agua = models.CharField(max_length=2)

    # Sección Documentacion Adjuntada
    documentos = models.ManyToManyField('DocumentoAdjunto')

    def __str__(self):
        return f"FichaPersonal: {self.apellido_paterno} {self.nombres}"

# Sección Hijos
class Hijo(models.Model):
    ficha_personal = models.ForeignKey(FichaPersonal, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    rut = models.CharField(max_length=12)  # Puedes ajustar la longitud según tus necesidades
    apellido_paterno_hijo = models.CharField(max_length=255)
    apellido_materno_hijo = models.CharField(max_length=255)
    fecha_nacimiento_hijo = models.DateField()
    parentesco = models.CharField(max_length=255)
    SEXO_CHOICES = [
        ('', 'Selecciona Sexo'),
        ('Masculino', 'Masculino'),
        ('Femenino', 'Femenino'),
    ]
    sexo = models.CharField(max_length=10, choices=SEXO_CHOICES)

# Documentos
class DocumentoAdjunto(models.Model):
    nombre = models.CharField(max_length=255)
    archivo = models.FileField(upload_to='documentos_adjuntos/')

    def __str__(self):
        return f"DocumentoAdjunto: {self.nombre}"
        