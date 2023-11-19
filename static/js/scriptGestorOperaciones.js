// Aquí js para búsqueda por motonave
$(document).ready(function () {
    $('#Buscar').on('input', function () {
        var valorBusqueda = $(this).val().toLowerCase();
        $('.tabla-filas tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(valorBusqueda) > -1);
        });
    });
});

// Obtener el token CSRF del cookie
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Buscar el nombre de la cookie con el formato 'csrftoken='
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(document).ready(function () {
    $(document).on('click', '.cambiar-estado', function () {
        var ficha_id = $(this).data('id');
        console.log('Ficha ID:', ficha_id);

        bootbox.prompt({
            title: "Seleccione el nuevo estado",
            inputType: 'select',
            inputOptions: [
                { text: 'Terminado', value: 'Terminado' },
                { text: 'En Proceso', value: 'En Proceso' },
                { text: 'No Iniciado', value: 'No Iniciado' }
            ],
            callback: function (result) {
                if (result !== null) {
                    var actualizarEstadoUrl = '/erp/actualizar_estado/' + ficha_id + '/';
                    console.log('URL:', actualizarEstadoUrl);

                    // Obtener el token CSRF
                    var csrftoken = getCookie('csrftoken');

                    $.ajax({
                        type: 'POST',
                        url: actualizarEstadoUrl,
                        data: {
                            'nuevo_estado': result,
                            'csrfmiddlewaretoken': csrftoken
                        },
                        dataType: 'json',
                        success: function (data) {
                            console.log('Datos recibidos del servidor:', data);
                            actualizarTabla(data);  // Asegúrate de que data tenga la estructura esperada
                        },
                        error: function (error) {
                            console.error('Error en la solicitud:', error);
                        }
                    });
                } else {
                    console.log('No se seleccionó un nuevo estado.');
                }
            }
        });
    });

    function actualizarTabla(data) {
        var tablaContainer = $('.table-container');
        var tablaFilas = tablaContainer.find('.tabla-filas');
      
        // Iterar sobre todas las filas de la tabla
        tablaFilas.find('tr').each(function () {
          var fila = $(this);
          var idFicha = fila.attr('data-correo');
      
          // Buscar la ficha correspondiente en los datos recibidos del servidor
          var fichaActualizada = JSON.parse(data.ficha).find(function (ficha) {
            return ficha.pk == idFicha;
          });
      
          if (fichaActualizada) {
            // Actualizar el estado y el color en la fila correspondiente a la ficha
            var nuevoEstado = fichaActualizada.fields.Estado;
            var nuevoColor = fichaActualizada.fields.color || '#FF0000'; // Rojo por defecto
      
            // Buscar los elementos en la fila
            var estadoContainer = fila.find('td#estado' + idFicha + ' .estado-container');
            var estadoTexto = estadoContainer.find('.estado-texto');
            var estadoColor = estadoContainer.find('.estado-color');
      
            // Actualizar el texto y el color
            estadoTexto.text(nuevoEstado);
            estadoColor.css('background-color', nuevoColor);
          }
        });
      }          
});
