document.addEventListener("DOMContentLoaded", function () {
    // Verificar si ya hay filas y eliminarlas si es necesario
    const table = document.getElementById('TablaHijos').getElementsByTagName('tbody')[0];
    while (table.rows.length > 0) {
        quitarHijo(table.rows[0]);
    }

    const agregarHijoButton = document.getElementById("agregarHijoButton");
    agregarHijoButton.addEventListener("click", agregarHijo);
});

function agregarHijo() {
    const table = document.getElementById('TablaHijos').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cells = [];
    const cellCount = 6;
    for (let i = 0; i < cellCount; i++) {
        cells.push(newRow.insertCell(i));
        if (i === 5) {
            const select = document.createElement('select');
            select.className = 'textbox select-sexo';
            select.id = 'sexo_' + table.rows.length;
            const options = ['Selecciona Sexo', 'Masculino', 'Femenino'];
            options.forEach((optionText) => {
                const option = document.createElement('option');
                option.value = optionText;
                option.text = optionText;
                select.appendChild(option);
            });
            cells[i].appendChild(select);
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = `textbox ${i === 0 ? 'rut' : (i === 1 ? 'apellidoPaterno' : (i === 2 ? 'apellidoMaterno' : (i === 3 ? 'nombres_hijo' : (i === 4 ? 'fecha_nacimiento_hijo' : ''))))}`;
            if (i === 0) {
                input.placeholder = 'Rut';
            } else if (i === 1) {
                input.placeholder = 'Apellido Paterno';
            } else if (i === 2) {
                input.placeholder = 'Apellido Materno';
            } else if (i === 3) {
                input.placeholder = 'Nombres';
                input.name = 'nombres_hijo';
            } else if (i === 4) {
                input.type = 'date';
                input.placeholder = 'Fecha de Nacimiento';
            }
            cells[i].appendChild(input);
        }
    }

    // Agregar el botón "Quitar" a la nueva fila
    const quitarButtonCell = newRow.insertCell(6);
    const quitarButton = document.createElement('button');
    quitarButton.type = 'button';
    quitarButton.className = 'quitarHijoButton';
    quitarButton.textContent = 'Quitar';
    quitarButton.onclick = function () {
        quitarHijo(newRow);
    };
    quitarButtonCell.appendChild(quitarButton);

    console.log('Se agregó la fila con éxito');
}

function quitarHijo(row) {
    const table = document.getElementById('TablaHijos').getElementsByTagName('tbody')[0];
    table.removeChild(row);
    console.log('Se quitó la fila con éxito');
}

// scriptPersonal.js

$(document).ready(function() {
    $('#guardarFichaPersonalButton').on('click', function(event) {
      event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
      
      // Obtener datos del formulario
      var formData = {
        apellido_paterno: $('#apellidoPaterno').val(),
        apellido_Materno: $('#apellidoMaterno').val(),
        Nombres: $('#nombres').val(),
        Rut: $('#rut').val(),
        estado_Civil: $('#estadoCivil').val(),
        Nacionalidad: $('#nacionalidad').val(),
        Dirección: $('#direccion').val(),
        Comuna: $('#comuna').val(),
        Correo_electronico: $('#correoElectronico').val(),
        Celular: $('#celular').val(),
        fecha_Nacimiento: $('#fechaNacimiento').val(),
        AFP: $('#afp').val(),
        Salud: $('#salud').val(),
        Otros: $('#otros').val(),
        tipo_cuenta: $('#tipoCuenta').val(),
        numero_cuenta: $('#nDeCuenta').val(),
        Banco: $('#banco').val(),
        Nombre_Apellido: $('#nombreYapellido').val(),
        Celular_emergencia: $('#celularEmergencia').val(),
        Parentesco: $('#Parentesco').val(),
        rut_hijo: $('#rut_hijo').val(),
        apellido_paterno_hijo: $('#apellido_paterno_hijo').val(),
        apellido_materno_hijo: $('#apellido_materno_hijo').val(),
        nombres_hijo: $('#nombres_hijo').val(),
        fecha_nacimiento_hijo: $('#fecha_nacimiento_hijo').val(),
        sexo_hijo: $('#sexo_hijo').val(),
        TallaPolera: $('#TallaPolera').val(),
        TallaPantalon: $('#TallaPantalon').val(),
        numeroCalzado: $('#numeroCalzado').val(),
        TallaOverol: $('#TallaOverol').val(),
        TallaTrajeDeAgua: $('#TallaTrajeDeAgua').val(),
        // Agrega aquí el resto de los campos según sea necesario
      };
  
      // Realizar solicitud AJAX
      $.ajax({
        type: 'POST',
        url: $('#fichaPersonalForm').attr('data-url'), // Obtener la URL del formulario
        data: JSON.stringify(formData),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(response) {
          // Manejar la respuesta del servidor
          console.log(response);
        },
        error: function(error) {
          // Manejar errores de la solicitud AJAX
          console.error('Error en la solicitud AJAX:', error);
        }
      });
    });
  });
  
