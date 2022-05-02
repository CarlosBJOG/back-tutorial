const { response } = require('express');

const Nivel = require('../models/nivel');

const postNiveles = async ( req, res = response) => {

    const nivel = req.body.nivel;
    
    const data = {
        nivel, 
        usuario: req.usuario._id, 
    }

    const nivelDb = new Nivel( data );

    await nivelDb.save();
    
    res.status(201).json({
        nivelDb
    });
}

const getNiveles = async ( req, res = response ) => {

    const {limite = 5, desde = 0} = req.query;

    //niveles activos
    const query = {estado: true};

    const [total, niveles] = await Promise.all([
        Nivel.countDocuments( query ),
        Nivel.find( query )
            .populate('usuario', 'nombre')
            .skip( Number(desde) )
            .limit( Number( limite ) )
    ]);

    res.status(201).json({
        total, 
        niveles
    });

}

const deleteNiveles = async ( req, res = response ) => {

    const  { id } = req.params;
    const nivel = await Nivel.findByIdAndUpdate(id, {estado: false}, {new: true})
                                .populate('usuario', 'nombre');

    res.status(200).json({
        msg: 'delete',
        nivel
    })

}


module.exports = {
    postNiveles,
    getNiveles,
    deleteNiveles,

}