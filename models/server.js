const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:  '/api/auth',
            categories:  '/api/categories',
            products:  '/api/products',
            search: '/api/search',
            uploads: '/api/uploads',
            users: '/api/users'
        }

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

        // Public directory
        this.app.use( express.static('public') );

        // File upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.users, require('../routes/user'));
    }

    listen() {
        this.app.listen( this.port );
    }
}

module.exports = Server;