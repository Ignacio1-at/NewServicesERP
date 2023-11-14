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

function manejarEntradaHoraPCR() {
    // lógica para manejar la entrada de hora para PCR
}

function manejarEntradaHoraETA() {
    // lógica para manejar la entrada de hora para ETA
}

document.addEventListener('DOMContentLoaded', inicializarScripts);

