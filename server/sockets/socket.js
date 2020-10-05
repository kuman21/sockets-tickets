const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {
    client.on('next', (data, callback) => {
        const nextTicket = ticketControl.next();
        console.log(nextTicket);

        callback(nextTicket);
    });

    // Emitir un evento estado actual
    client.emit('currentState', {
        current: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFour(),
    });

    client.on('attendTicket', (data, callback) => {
        if (!Number(data.desk)) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }

        const attendTicket = ticketControl.attendTicket(Number(data.desk));

        callback(attendTicket);

        // actualizar cambios en los últimos 4
        client.broadcast.emit('lastFour', { lastFour: ticketControl.getLastFour() });
    });
});