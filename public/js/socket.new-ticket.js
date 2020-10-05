// comando para establecer la conexión
const socket = io();

const label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('currentState', function(resp) {
    label.text(resp.current);
});

$('button').on('click', function() {
    socket.emit('next', null, function(nextTicket) {
        label.text(nextTicket);
    });
});