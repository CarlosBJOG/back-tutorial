const { response } = require('express');

const Seccion = require('../models/secciones');


const crearSeccion = async ( req, res = response) => {

    const {nombre_seccion, id_categoria} = req.body;
  
    const data = {
        nombre_seccion,
        usuario: req.usuario._id,
        id_categoria
    }

    const seccion = new Seccion( data )
    
    await seccion.save();

    res.status(201).json({ 
        seccion
    })

}

const obtenerSecciones = async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query;

    const query = { estado: true };

    const [total, secciones]  = await Promise.all([
        Seccion.countDocuments( query ),
        Seccion.find( query )
            .populate('usuario', 'nombre')
            .populate('id_categoria', 'nombre_categoria')

            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);
    
    res.status(200).json({
        total,
        secciones
    });


}


const obtenerSeccionesById = async ( req, res = response) => {

    const { id } = req.params;

    const seccion = await Seccion.findById( id )
                        .populate('usuario', 'nombre')
                        .populate('id_categoria', 'nombre_categoria')

    res.status(200).json({
        seccion
    })
}

const actualizarSeccion = async ( req, res = response ) => {

    const { id } = req.params;

    const { estado, id_categoria, ...resto } = req.body;
    const nombreSeccion = resto.nombre_seccion.toUpperCase();
    
    const seccion = await Seccion.findByIdAndUpdate( id, {nombre_seccion: nombreSeccion}, { new: true });

    res.status(201).json({
        seccion
    })

}

const desactivarSeccion = async ( req, res = response) => {

    const { id } = req.params;

    const seccion = await Seccion.findByIdAndUpdate( id, {estado: false }, { new: true });

    res.status(200).json({ seccion });

}

module.exports = {
    crearSeccion,
    obtenerSecciones,
    obtenerSeccionesById,
    actualizarSeccion,
    desactivarSeccion,

}