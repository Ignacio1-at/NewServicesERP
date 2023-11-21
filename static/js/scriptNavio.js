function inicializarScripts() {
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

function validarCampos() {
    console.log('Iniciando validación');
    var formulario = document.getElementById("fichaNavioForm");

    // Obtener referencias a los elementos del formulario
    var campoNave = formulario.querySelector("[name='Nave']");
    var campoViaje = formulario.querySelector("[name='Viaje']");
    var campoPuerto = formulario.querySelector("[name='Puerto']");
    var campoCarga = formulario.querySelector("[name='Carga']");
    var campoProcedencia = formulario.querySelector("[name='Procedencia']");
    var campoCantidadPersonas = formulario.querySelector("[name='cantidadPersonas']");
    var campoCantidadPuerto = formulario.querySelector("[name='CantidadPuerto']");
    var campoTipoServicio = formulario.querySelector("[name='TipoServicio']");
    var campoArmador = formulario.querySelector("[name='Armador']");
    var campoAgencia = formulario.querySelector("[name='Agencia']");
    var campoProximoPuerto = formulario.querySelector("[name='ProximoPuerto']");
    var campoEncalado = formulario.querySelector("[name='Encalado']");
    var campoETA = formulario.querySelector("[name='ETA']");
    var campoBombasumergible = formulario.querySelector("[name='Bombasumergible']");
    var campoCubierta = formulario.querySelector("[name='Cubierta']");
    var campoShapeBox = formulario.querySelector("[name='ShapeBox']");
    var campoPCR = formulario.querySelector("[name='PCR']");

    // Validaciones
    if (campoNave.value.trim() === "") {
        alert("El campo Nave no puede estar vacío.");
        console.log('Validación fallida en campoNave');
        return false;
    }

    if (campoViaje.value.trim() === "") {
        alert("El campo Viaje no puede estar vacío.");
        console.log('Validación fallida en campoViaje');
        return false;
    }

    if (campoPuerto.value.trim() === "") {
        alert("El campo Puerto no puede estar vacío.");
        console.log('Validación fallida en campoPuerto');
        return false;
    }

    if (campoCarga.value.trim() === "") {
        alert("El campo Carga no puede estar vacío.");
        console.log('Validación fallida en campoCarga');
        return false;
    }

    if (campoProcedencia.value.trim() === "") {
        alert("El campo Procedencia no puede estar vacío.");
        console.log('Validación fallida en campoProcedencia');
        return false;
    }

    if (campoTipoServicio.value.trim() === "") {
        alert("El campo Tipo de Servicio no puede estar vacío.");
        console.log('Validación fallida en campoTipoServicio');
        return false;
    }

    if (campoArmador.value.trim() === "") {
        alert("El campo Armador no puede estar vacío.");
        console.log('Validación fallida en campoArmador');
        return false;
    }

    if (campoAgencia.value.trim() === "") {
        alert("El campo Agencia no puede estar vacío.");
        console.log('Validación fallida en campoAgencia');
        return false;
    }

    if (campoProximoPuerto.value.trim() === "") {
        alert("El campo Proximo Puerto no puede estar vacío.");
        console.log('Validación fallida en campoProximoPuerto');
        return false;
    } 

    if (campoEncalado.value.trim() === "Encalado") {
        alert("Por favor, selecciona una opción válida para Encalado.");
        console.log('Validación fallida en campoEncalado');
        return false;
    }

    // Validación para el campo ETA (tipo fecha)

    if (campoETA.value === "") {
        alert("El campo ETA no puede estar vacío.");
        console.log('Validación fallida en campoETA');
        return false;
    }

    if (campoBombasumergible.value.trim() === "Bombasumergible") {
        alert("Por favor, selecciona una opción válida para Bomba Sumergible.");
        console.log('Validación fallida en campoBombasumergible');
        return false;
    }

    if (campoCubierta.value.trim() === "Cubierta") {
        alert("Por favor, selecciona una opción válida para Cubierta.");
        console.log('Validación fallida en campoCubierta');
        return false;
    }

    if (campoShapeBox.value.trim() === "ShapeBox") {
        alert("Por favor, selecciona una opción válida para Shape Box.");
        console.log('Validación fallida en campoShapeBox');
        return false;
    }

    if (campoPCR.value.trim() === "PCR") {
        alert("Por favor, selecciona una opción válida para PCR.");
        console.log('Validación fallida en campoPCR');
        return false;
    }

    // Validación para el campo cantidadPersonas (tipo número)
    if ((campoCantidadPersonas.value.trim() === "") || (isNaN(campoCantidadPersonas.value.trim())) || (campoCantidadPersonas.value.trim() < 0)) {
        alert("Por favor, ingrese una cantidad de personas válida.");
        console.log('Validación fallida en campoCantidadPersonas');
        return false;
    }

    // Validación para el campo puerto (tipo número)
    if ((campoCantidadPuerto.value.trim() === "") || (isNaN(campoCantidadPuerto.value.trim())) || (campoCantidadPuerto.value.trim() < 0)) {
        alert("Por favor, ingrese un número de puerto válido.");
        console.log('Validación fallida en campoCantidadPuerto');
        return false;
    }

    console.log('Validación completa');
    return true;

}

jQuery(document).ready(function ($) {
    jQuery('#fichaNavioForm').submit(function (event) {

        console.log('Evento submit capturado');

        event.preventDefault();

        // Primero se valida el formulario
        if (!validarCampos()) {
            // Si la validación falla, se detiene la ejecución aquí
            console.log('La validación falló');
            return;
        }

        console.log('Validación exitosa, enviando formulario con AJAX');

        // Utiliza FormData para serializar todos los campos, incluso aquellos vacíos
        var formData = new FormData(this);

        jQuery.ajax({
            type: 'POST',
            url: nuevaFichaURL,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRFToken', '{{ csrf_token }}');
            },

            success: function (data) {
                console.log(data);

                if (data.redireccionar_a) {
                    console.log('Respuesta del servidor:', data);
                    console.log("Redireccionando a:", data.redireccionar_a);
                    window.location.href = data.redireccionar_a;
                } else {
                    console.error("La respuesta no contiene una URL de redirección.");
                    console.error("Mensaje de error:", data.mensaje);

                    if (data.errores_validacion) {
                        console.error('Error en la solicitud AJAX:', xhr, status, error);
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

    console.log('Solicitud AJAX enviada');
    // Llama a la función de inicialización después de que el DOM esté listo
    inicializarScripts();
});



