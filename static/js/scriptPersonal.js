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
    quitarButton.onclick = function() {
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

document.addEventListener("DOMContentLoaded", function () {
    var nuevaFichaPersonalURL = $('#fichaPersonalForm').data('url');

    $('#fichaPersonalForm').submit(function (event) {

        console.log("Enviando formulario con método POST");
        event.preventDefault();

        console.log("Formulario enviado. Realizando solicitud AJAX...");

        var formData = new FormData(document.getElementById('fichaPersonalForm'));

        $.ajax({
            type: 'POST',
            url: nuevaFichaPersonalURL,
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log("Respuesta del servidor:", data);

                if (data.redireccionar_a) {
                    console.log("Redireccionando a:", data.redireccionar_a);
                    window.location.href = data.redireccionar_a;
                } else {
                    console.error("La respuesta no contiene una URL de redirección.");
                    console.error("Mensaje de error:", data.mensaje);

                    if (data.errores_validacion && Object.keys(data.errores_validacion).length > 0) {
                        Object.keys(data.errores_validacion).forEach(function (field) {
                            const errorMessage = data.errores_validacion[field].join(', ');
                            alert(`Error en el campo ${field}: ${errorMessage}`);
                        });
                    }
                }
            },
            error: function (data) {
                console.error("Error en la solicitud AJAX:", data);
                console.log("Datos completos:", data);
            }
        });
    });
});
