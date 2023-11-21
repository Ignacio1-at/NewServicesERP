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
  CantidadPuerto = models.IntegerField()
  Estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='No Iniciado')
  color = models.CharField(max_length=20, default='#FFFFFF')  

  def obtener_color_para_estado(self):
      colores_por_estado = {
          'Terminado': '#00FF00',  # Verde
          'En Proceso': '#FFFF00',  # Amarillo
          'No Iniciado': '#FF0000',  # Rojo
      }
      return colores_por_estado.get(self.Estado, '#FFFFFF')  # Blanco por defecto

  def save(self, *args, **kwargs):
      # Actualizar el color cada vez que se guarde la ficha
      self.color = self.obtener_color_para_estado()
      super().save(*args, **kwargs)

  def __str__(self):
      return self.Nave
    
#----------------------TABLA DE FICHA PERSONAL-----------------------------------------------------------------------------    

class Hijo(models.Model):
    nombre = models.CharField(max_length=255)
    rut = models.CharField(max_length=20, unique=True)
    apellido_paterno = models.CharField(max_length=255)
    apellido_materno = models.CharField(max_length=255)
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=20, choices=[('Masculino', 'Masculino'), ('Femenino', 'Femenino')])

    ficha_personal = models.ForeignKey('FichaPersonal', on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.nombre} ({self.rut})'


#--------------------Seccion    

class FichaPersonal(models.Model):
    ESTADO_CHOICES = [
        ('Disponible', 'Disponible'),
        ('En Operacion', 'En Operacion'),
        ('No Disponible', 'No Disponible'),
    ]

    ESTADO_CIVIL_CHOICES = [
        ('Soltero', 'Soltero'),
        ('Casado', 'Casado'),
        ('Viudo', 'Viudo'),
    ]

    BANCO_CHOICES = [
        ('', 'Selecciona Banco'),
        ('BCI', 'BCI'),
        ('Banco Estado', 'Banco Estado'),
    ]

    TALLA_CHOICES = [
        ('', 'Selecciona Talla'),
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
    ]

    Estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='Disponible')
    color = models.CharField(max_length=20, default='#00FF00')

    apellido_paterno = models.CharField(max_length=255)
    apellido_materno = models.CharField(max_length=255)
    nombres = models.CharField(max_length=255)
    rut = models.CharField(max_length=20, unique=True)
    estado_civil = models.CharField(max_length=20, choices=ESTADO_CIVIL_CHOICES)
    nacionalidad = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    comuna = models.CharField(max_length=255)
    correo_electronico = models.EmailField()
    celular = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField()

    afp = models.CharField(max_length=255)
    salud = models.CharField(max_length=255)
    otros_previsionales = models.CharField(max_length=255)

    tipo_cuenta_bancaria = models.CharField(max_length=255)
    numero_cuenta_bancaria = models.CharField(max_length=255)
    banco = models.CharField(max_length=255, choices=BANCO_CHOICES)

    contacto_emergencia_nombre = models.CharField(max_length=255)
    contacto_emergencia_celular = models.CharField(max_length=20)
    contacto_emergencia_parentesco = models.CharField(max_length=255)

    hijos = models.ManyToManyField(Hijo, blank=True)

    talla_polera = models.CharField(max_length=5, choices=TALLA_CHOICES)
    talla_pantalon = models.CharField(max_length=5, choices=TALLA_CHOICES)
    calzado_seguridad = models.IntegerField()
    talla_overol = models.CharField(max_length=5, choices=TALLA_CHOICES)
    talla_traje_agua = models.CharField(max_length=5, choices=TALLA_CHOICES)

    documentos = models.FileField(upload_to='documentos/')

    def __str__(self):
        return f'{self.nombres} {self.apellido_paterno} ({self.rut})'
    
#----------------------TABLA DE FICHA Herramientas-----------------------------------------------------------------------------    

    
class FichaHerramientas(models.Model):
  marca = models.CharField(max_length=255)
  fecha_ingreso = models.DateField()
  modelo = models.CharField(max_length=255)
  cantidad_herramientas = models.IntegerField()

  TIPO_HERRAMIENTA_CHOICES = [
      ('Manual', 'Manual'),
      ('Mecanico', 'Mecanico'),
      # Agrega otros tipos según sea necesario
  ]

  tipo_herramienta = models.CharField(max_length=50, choices=TIPO_HERRAMIENTA_CHOICES)

  def __str__(self):
      return f'{self.marca} - {self.modelo} - Cantidad: {self.cantidad_herramientas}'   
  
  #----------------------TABLA DE FICHA Quimico-----------------------------------------------------------------------------    

  
class FichaQuimico(models.Model):
      
  TIPO_QUIMICO_CHOICES = [
      ('OCN 01', 'OCN 01'),
      ('OCN 08', 'OCN 08'),
      ('Acido Clorhídrico', 'Acido Clorhídrico'),
      ('Hipoclorito', 'Hipoclorito'),
      ('Hold Coat', 'Hold Coat'),
  ]

  CAPACIDAD_BIN_CHOICES = [
      ('Lleno', 'Lleno (1000 lts) aprox'),
      ('Medio', 'Medio (500 lts) aprox'),
  ]

  LUGAR_ALMACENAMIENTO_CHOICES = [
      ('Taller', 'Taller'),
      ('Container', 'Container'),
  ]

  tipo_quimico = models.CharField(max_length=50, choices=TIPO_QUIMICO_CHOICES, default='OCN 01')
  fecha_registro = models.DateField()
  capacidad_bines = models.CharField(max_length=255, default='Lleno (1000 lts) aprox')
  lugar_almacenamiento = models.CharField(max_length=255, default='Taller')

  def __str__(self):
      return f'{self.tipo_quimico} - {self.fecha_registro}'
  
    #----------------------TABLA DE FICHA Vehiculos-----------------------------------------------------------------------------    

class FichaVehiculo(models.Model):
  TIPO_VEHICULO_CHOICES = [
      ('', 'Seleccione un tipo de vehículo'),
      ('Auto', 'Auto'),
      ('Camioneta', 'Camioneta'),
      ('Furgon', 'Furgon'),
      ('Camion', 'Camion'),
  ]

  TIPO_COMBUSTIBLE_CHOICES = [
      ('', 'Seleccione un tipo de combustible'),
      ('Diesel', 'Diesel'),
      ('Bencinero', 'Bencinero'),
  ]

  marca = models.CharField(max_length=255)  # Cambiado a CharField para texto
  fecha_ingreso = models.DateField()
  modelo = models.CharField(max_length=255)
  patente = models.CharField(max_length=10)  # Ajusta la longitud según sea necesario
  chasis = models.CharField(max_length=255)
  tipo_vehiculo = models.CharField(max_length=50, choices=TIPO_VEHICULO_CHOICES)
  tipo_combustible = models.CharField(max_length=50, choices=TIPO_COMBUSTIBLE_CHOICES)

  def __str__(self):
      return f'{self.marca} - {self.modelo} - {self.patente}'
  
  #----------------------TABLA DE FICHA Mantenimiento-----------------------------------------------------------------------------    
  
class FichaMantenimiento(models.Model):
  TIPO_Categoria_CHOICES = [
      ('', 'Seleccione una Categoria'),
      ('Vehiculo', 'Vehiculo'),
      ('Herramienta', 'Herramienta'),
      ('Motonave', 'Motonave'),
  ]

  TIPO_Accion_CHOICES = [
      ('', 'Seleccione una accion'),
      ('Mantenimiento', 'Mantenimiento'),
      ('Revision', 'Revision'),
  ]

  TIPO_Estado_CHOICES = [
      ('', 'Seleccione un estado'),
      ('Disponible', 'Disponible'),
      ('No Disponible', 'No Disponible'),
  ]


  categoria = models.CharField(max_length=50, choices=TIPO_Categoria_CHOICES)
  accion = models.CharField(max_length=50, choices=TIPO_Accion_CHOICES)
  estado = models.CharField(max_length=50, choices=TIPO_Estado_CHOICES)

  def __str__(self):
      return f'{self.categoria} - {self.accion} - {self.estado}'