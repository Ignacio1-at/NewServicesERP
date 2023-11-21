jQuery(document).ready(function ($) {
  jQuery('#FichaQuimicoForm').submit(function (event) {
      event.preventDefault();

      // Utiliza FormData para serializar todos los campos, incluso aquellos vacíos
      var formData = new FormData(this);

      jQuery.ajax({
          type: 'POST',
          url: nuevaFichaURL,
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

  // Llama a la función de inicialización después de que el DOM esté listo
  inicializarScripts();
});

function validarCamposQuimicos() {
  var formulario = document.querySelector("form");

  // Obtener referencias a los elementos del formulario
  var campoTipoQuimico = formulario.querySelector("#tipoquimicos");
  var campoFechaRegistro = formulario.querySelector("#fechaRegistro");
  var campoStockBines = formulario.querySelector("#stockbines");
  var campoLugarAlmacenamiento = formulario.querySelector("#lugaralmacenamiento");

  // Validar que todos los campos estén rellenados
  var camposVacios = [];
  if (campoTipoQuimico.value === "") {
    camposVacios.push("Seleccione un Químico");
  }
  if (campoFechaRegistro.value === "") {
    camposVacios.push("Ingrese Fecha de Registro");
  }
  if (campoStockBines.value === "") {
    camposVacios.push("Seleccione Capacidad de Bines");
  }
  if (campoLugarAlmacenamiento.value === "") {
    camposVacios.push("Seleccione Lugar de Almacenamiento");
  }

  // Mostrar mensaje de error si hay campos vacíos
  if (camposVacios.length > 0) {
    alert("Los siguientes campos están vacíos: " + camposVacios.join(", "));
    return false;
  }

  // Si todos los campos están rellenados, se permite enviar el formulario
  return true;
}

// Agregar evento de escucha al botón de envío
document.getElementById("GuardarFicha").addEventListener("click", validarCamposQuimicos);