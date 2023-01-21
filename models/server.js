const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // DB connection
        this.connectDB();

        // Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        
        // CORS
        this.app.use(cors());

        // Body read and parse
        this.app.use( express.json() );

        //Public directory
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen() {
        this.app.listen( this.port );
    }
}

module.exports = Server;