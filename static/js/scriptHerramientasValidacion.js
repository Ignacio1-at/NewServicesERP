jQuery(document).ready(function ($) {
  jQuery('#fichaHerramientaForm').submit(function (event) {
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

function validarCamposHerramientas() {
    var formulario = document.getElementById("formularioHerramientas");

    // Obtener referencias a los elementos del formulario
    var campoMarca = formulario.querySelector("[name='marca']");
    var campoFechaIngreso = formulario.querySelector("[name='fechaIngreso']");
    var campoModelo = formulario.querySelector("[name='modelo']");
    var campoCantidadHerramientas = formulario.querySelector("[name='CantidadHerramientas']");
    var campoTipoHerramienta = formulario.querySelector("[name='tipoHerramienta']");

    // Validar que todos los campos estén rellenados
    var camposVacios = [];
    if (campoMarca.value === "") {
      camposVacios.push("Ingresar Marca de Herramienta");
    }
    if (campoFechaIngreso.value === "") {
      camposVacios.push("Ingresar Fecha de Compra de Herramienta");
    }
    if (campoModelo.value === "") {
      camposVacios.push("Ingresar Modelo de la Herramienta");
    }
    if (campoCantidadHerramientas.value === "") {
      camposVacios.push("Ingresar Cantidad de Herramientas");
    }

    // Validar que el tipo de herramienta esté seleccionado
    if (campoTipoHerramienta.value === "") {
      camposVacios.push("Ingresar Tipo de Herramienta");
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
  document.getElementById("GuardarFicha").addEventListener("click", validarCamposHerramientas);