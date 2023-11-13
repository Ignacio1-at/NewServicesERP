// Obtén referencias a los elementos del formulario de inicio de sesión
var emailInput = document.getElementById('loginUser');
var passwordInput = document.getElementById('loginpassword');
var loginForm = document.getElementById('login-form');

// Agrega un controlador de eventos para el envío del formulario
loginForm.addEventListener('submit', function(event) {
  var email = emailInput.value;
  var password = passwordInput.value;
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
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Función para validar la contraseña
function validatePassword(password) {
  return password.length >= 8;
}
