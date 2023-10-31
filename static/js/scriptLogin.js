document.getElementById('login-form').addEventListener('submit', function(event) {
    var email = document.getElementById('loginUser').value;
    var password = document.getElementById('loginpassword').value;
    var isValid = true;

    // Validación del correo electrónico
    if (!validateEmail(email)) {
        isValid = false;
        alert('Por favor, ingresa un correo electrónico válido.');
    }

    // Validación de la contraseña
    if (!validatePassword(password)) {
        isValid = false;
        alert('Por favor, ingresa una contraseña válida.');
    }

    if (!isValid) {
        event.preventDefault(); // Evita que el formulario se envíe si no es válido
    }
});

// Función para validar el correo electrónico
function validateEmail(email) {
    // Utiliza una expresión regular para validar el formato del correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar la contraseña
function validatePassword(password) {
    // Puedes agregar tus propias reglas de validación de contraseña aquí
    // Por ejemplo, verificar la longitud mínima, la presencia de mayúsculas, minúsculas, números, etc.
    return password.length >= 8;
}

// Obtén referencias a los elementos del formulario de inicio de sesión
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var loginForm = document.getElementById('login-form');

// Agrega un controlador de eventos para el envío del formulario
loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que se envíe el formulario de forma predeterminada

  var email = emailInput.value;
  var password = passwordInput.value;

  // Inicia sesión con el correo electrónico y la contraseña proporcionados
  auth.signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // El inicio de sesión fue exitoso
      // Realiza las acciones necesarias, como redireccionar a la página de inicio o mostrar un mensaje de éxito
      console.log('Inicio de sesión exitoso');
    })
    .catch(function(error) {
      // Ocurrió un error durante el inicio de sesión
      // Maneja el error de acuerdo a tus necesidades, por ejemplo, mostrando un mensaje de error
      console.log('Error de inicio de sesión:', error.message);
    });
});

