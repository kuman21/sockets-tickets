const socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

const desk = searchParams.get('desk');
const label = $('small');

$('h1').text('Escritorio ' + desk);

$('button').on('click', function() {
    socket.emit('attendTicket', { desk: desk }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.number);
    });
});