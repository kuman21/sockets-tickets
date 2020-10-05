const fs = require('fs');

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {
    constructor() {
        this.last = 0
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        const data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.restartCount();
        }
    }

    next() {
        this.last += 1;
        
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.storeFile();

        return `Ticket ${ this.last }`;
    }

    getLastTicket() {
        return `Ticket ${ this.last }`;
    }

    getLastFour() {
        return this.lastFour;
    }

    attendTicket(desk) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        const numberTicket = this.tickets[0].number;
        this.tickets.shift();

        const attendTicket = new Ticket(numberTicket, desk);
        this.lastFour.unshift( attendTicket );

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1); // Borra el último
        }

        console.log('últimos 4');
        console.log(this.lastFour);

        this.storeFile();
        
        return attendTicket;
    }

    restartCount() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];

        console.log('Se ha inicializado el sistema');

        this.storeFile();
    }

    storeFile() {
        const jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };

        const jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}