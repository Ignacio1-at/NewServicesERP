$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});

$(window).scroll(function() {
    var scrollTop = $(document).scrollTop();
    var logo = $('#logo-img');
    var scale = 1 - scrollTop * 0.002; // Ajusta este valor para cambiar el achicamiento

    if (scale < 0.5) {
        scale = 0.5; // Define un valor mínimo para evitar que el logo se haga demasiado pequeño
    }

    logo.css('transform', 'scale(' + scale + ')');
});

