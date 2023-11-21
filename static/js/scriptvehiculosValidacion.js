// Archivo: validacion_formulario.js

function validarFormulario() {
    // Obtener referencias a los campos del formulario
    var marca = document.getElementById("marca").value;
    var fechaIngreso = document.getElementById("fechaIngresoVehiculo").value;
    var modelo = document.getElementById("modelo").value;
    var patente = document.getElementById("patente").value;
    var chasis = document.getElementById("chasis").value;
    var tipoVehiculo = document.getElementById("TipoVehiculo").value;
    var tipoCombustible = document.getElementById("TipoCombustible").value;

    // Verificar que los campos no estén vacíos
    if (marca === "" || fechaIngreso === "" || modelo === "" || patente === "" || chasis === "" || tipoVehiculo === "TipoVehiculo" || tipoCombustible === "TipoCombustible") {
        alert("Por favor, complete todos los campos del formulario.");
        return false; // Evita que el formulario se envíe si hay campos vacíos
    }

    return true; // El formulario se enviará si pasa todas las validaciones
}
