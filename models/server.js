const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3030;
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            niveles: '/api/niveles',
            secciones: '/api/secciones',
            categorias: '/api/categorias',
        }

        this.conectarDb();

        this.middlewares();

        this.routes();

    }

    async conectarDb () {
        await dbConnection();
    }

    middlewares() {

        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public') )

    }

    routes(){
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.niveles, require('../routes/niveles'));
        this.app.use( this.paths.secciones, require('../routes/secciones'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.info('Servidor corriendo en puerto', this.port );
        })
    }

}

module.exports = Server;
