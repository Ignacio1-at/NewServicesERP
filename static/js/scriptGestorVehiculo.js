// Aquí js para búsqueda por Vehiculo
$(document).ready(function () {
    $('#Buscar').on('input', function () {
        console.log("Script cargado correctamente.");
        var valorBusqueda = $(this).val().toLowerCase();
        $('.tabla-filas tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(valorBusqueda) > -1);
        });
    });
});
