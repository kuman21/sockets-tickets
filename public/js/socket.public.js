const socket = io();

const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

const lblDesk1 = $('#lblEscritorio1');
const lblDesk2 = $('#lblEscritorio2');
const lblDesk3 = $('#lblEscritorio3');
const lblDesk4 = $('#lblEscritorio4');

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('currentState', function(data) {
    updateHTML( data.lastFour );
});

socket.on('lastFour', function(data) {
    let audio = new Audio('audio/new-ticket.mp3');
    playPromise = audio.play();
    playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
    }).catch(console.log);

    updateHTML( data.lastFour );
});

function updateHTML( lastFour ) {
    for (let i = 0; i <= lastFour.length - 1; i++) {
        lblTickets[i].text('Ticket ' + lastFour[i].number);
        lblDesks[i].text('Escritorio ' + lastFour[i].desk);
    }
}