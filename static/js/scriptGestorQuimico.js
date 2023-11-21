// Aquí js para búsqueda por vehiculo
$(document).ready(function () {
    $('#Buscar').on('input', function () {
        console.log("Script cargado correctamente.");
        var valorBusqueda = $(this).val().toLowerCase();
        $('.tabla-filas tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(valorBusqueda) > -1);
        });
    });
});

$(document).ready(function () {
    // Manejar cambios en los checkboxes de tipo_quimico
    $('.nombre-checkbox').change(function () {
        // Obtener los tipo_quimico seleccionados
        var tipoQuimicoSeleccionados = $('.nombre-checkbox:checked').map(function () {
            return $(this).data('estado').toLowerCase();
        }).get();

        // Mostrar u ocultar las filas de la tabla según los tipo_quimico seleccionados
        $('.tabla-filas tr').each(function () {
            var fila = $(this);
            var tipoQuimicoFila = fila.data('estados').toLowerCase();

            if (tipoQuimicoSeleccionados.length === 0 || tipoQuimicoSeleccionados.includes(tipoQuimicoFila)) {
                fila.show();
            } else {
                fila.hide();
            }
        });
    });

    // Función para verificar si un tipo_quimico está en un array
    function tipoQuimicoEnArray(tipoQuimico, array) {
        return array.indexOf(tipoQuimico) !== -1;
    }
});

