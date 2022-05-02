const { request, response } = require('express');


const Seccion = require('../models/secciones');


const validarNombreSeccion = async ( req = request, res = response, next ) => {
    
    try{

        const { ...seccion } = req.body;
        
        const nombreSeccion = seccion.nombre_seccion.toUpperCase();
        const seccionDb = await Seccion.findOne({nombre_seccion: nombreSeccion });

        if(seccionDb) return res.status( 400 ).json({ msg: `El nombre de la seccion ${nombreSeccion} ya esta registrado en la BD` });

        seccion.nombre_seccion = nombreSeccion;
        req.body = seccion;

        next();

    }catch( error ){
        console.log(error);
        res.status(500).json({ msg: 'Hable con el administrador, problemas con secciones' });
    }

}

module.exports = {
    validarNombreSeccion,

}
