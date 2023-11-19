function inicializarScripts() {
    debugger;
    var horaRegistroPCR = document.getElementById('horaRegistroPCR');
    var horaRegistroETA = document.getElementById('horaRegistroETA');

    console.log(horaRegistroPCR, horaRegistroETA);

    if (horaRegistroPCR) {
        horaRegistroPCR.addEventListener('input', manejarEntradaHoraPCR);
    }

    if (horaRegistroETA) {
        horaRegistroETA.addEventListener('input', manejarEntradaHoraETA);
    }
}

$(document).ready(function () {
    $('#fichaNavioForm').submit(function (event) {
        event.preventDefault();

        // Utiliza FormData para serializar todos los campos, incluso aquellos vacíos
        var formData = new FormData(this);

        $.ajax({
            type: 'POST',
            url: nuevaFichaURL,  // Usa la variable definida en el HTML
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);

                if (data.redireccionar_a) {
                    console.log("Redireccionando a:", data.redireccionar_a);
                    window.location.href = data.redireccionar_a;
                } else {
                    console.error("La respuesta no contiene una URL de redirección.");
                    console.error("Mensaje de error:", data.mensaje);

                    if (data.errores_validacion) {
                        // Muestra los errores de validación en la consola
                        console.error("Errores de validación:", data.errores_validacion);
                    }
                }
            },
            error: function (data) {
                console.error("Error en la solicitud AJAX:", data);
                console.error("Mensaje de error:", data.mensaje);
            }
        });
    });
});