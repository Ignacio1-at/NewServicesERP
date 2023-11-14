document.addEventListener("DOMContentLoaded", function () {
    var logoutLink = document.getElementById("logout-link");

    if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
            event.preventDefault();
            // Coloca aquí la lógica para cerrar la sesión del usuario. Puedes limpiar cookies, variables de sesión, etc.
            
            // Redirige al usuario a la página de inicio de sesión
            window.location.href = "/erp/login/"; // Esta es la URL de inicio de sesión en tu aplicación Django.
        });
    }
});
