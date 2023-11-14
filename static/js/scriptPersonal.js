document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById("file-input");
    const documentList = document.getElementById("document-list");
  
    fileInput.addEventListener("change", handleFileChange);
  
    function handleFileChange() {
      const files = fileInput.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
          displayFileInfo(file);
        }
      }
  
      fileInput.value = null; // Restablecer el valor del campo de entrada para que puedas seleccionar más documentos.
    }
  
    function displayFileInfo(file) {
      const fileName = file.name;
      const listItem = document.createElement("li");
      listItem.textContent = fileName;
      documentList.appendChild(listItem);
  
      // Mostrar enlace para descargar el documento
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.target = "_blank";
      downloadLink.textContent = "Descargar";
      listItem.appendChild(downloadLink);
    }
  });

  function validarRut(rut) {
    // Expresión regular para el formato de RUT (XX.XXX.XXX-Y)
    var rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-\d{1,2}$/;

    if (!rutRegex.test(rut)) {
        alert('Formato de RUT incorrecto. Utiliza el formato XX.XXX.XXX-Y.');
        return false;
    }

    // Validación del dígito verificador
    var rutSinGuion = rut.replace('-', '');
    var rutArray = rutSinGuion.split('.');
    var rutNumero = parseInt(rutArray[0] + rutArray[1] + rutArray[2], 10);
    var dv = parseInt(rutArray[3], 10);

    var modulo = 11;
    var suma = 0;
    var multiplicador = 1;

    while (rutNumero > 0) {
        multiplicador++;
        if (multiplicador === modulo) multiplicador = 2;
        suma += (rutNumero % 10) * multiplicador;
        rutNumero = Math.floor(rutNumero / 10);
    }

    var resto = suma % 11;
    var resultado = 11 - resto;

    if (resultado === 11) resultado = 0;
    if (resultado === 10) resultado = 'K';

    if (resultado !== dv) {
        alert('RUT inválido. El dígito verificador no coincide.');
        return false;
    }

    return true;
}

function validarFechaNacimiento(fecha) {
  // Expresión regular para el formato de fecha (YYYY-MM-DD)
  var fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!fechaRegex.test(fecha)) {
      alert('Formato de fecha incorrecto. Utiliza el formato YYYY-MM-DD.');
      return false;
  }

  // Validación de fecha válida
  var partesFecha = fecha.split('-');
  var year = parseInt(partesFecha[0], 10);
  var month = parseInt(partesFecha[1], 10);
  var day = parseInt(partesFecha[2], 10);

  var fechaObj = new Date(year, month - 1, day);

  if (
      fechaObj.getFullYear() !== year ||
      fechaObj.getMonth() !== month - 1 ||
      fechaObj.getDate() !== day
  ) {
      alert('Fecha de nacimiento inválida.');
      return false;
  }

  return true;
}

function validarCamposEspecificos() {
  // Campos a validar
  var campos = [
      'nacionalidad',
      'direccion',
      'comuna',
      'correoElectronico',
      'celular',
      'contactoEmergencia',
      'celularEmergencia',
      'parentescoEmergencia',
      'afp',
      'salud',
      'otros',
      'tipoCuenta',
      'numeroCuenta',
      'banco',
      'tallaPolera',
      'tallaPantalon',
      'calzadoSeguridad',
      'tallaOverol',
      'tallaTrajeDeAgua',
      // Agrega más campos según sea necesario
  ];

  for (var i = 0; i < campos.length; i++) {
      var fieldValue = $('#' + campos[i]).val();
      if (!fieldValue) {
          alert('Por favor, completa todos los campos específicos.');
          return false;
      }
  }

  return true;
}

function validarHijos() {
  var filasHijos = $('#TablaHijos tbody tr');
  
  for (var i = 0; i < filasHijos.length; i++) {
      var fila = filasHijos[i];
      var camposHijo = ['rut', 'apellidoPaterno', 'apellidoMaterno', 'nombresHijo', 'fechaNacimientoHijo', 'parentescoHijo', 'sexoHijo'];

      for (var j = 0; j < camposHijo.length; j++) {
          var campoHijo = $(fila).find('.' + camposHijo[j]);
          var fieldValue = campoHijo.val();

          if (!fieldValue) {
              alert('Por favor, completa todos los campos de los hijos.');
              return false;
          }
      }
  }

  return true;
}  