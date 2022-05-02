const { response } = require('express');

const Categoria = require('../models/categoria');

const crearCategoria = async ( req, res = response) => {

    const { estado, usuario, ...body} = req.body;

    const data = {
        nombre_categoria: body.nombre_categoria.toUpperCase(),
        usuario: req.usuario._id,
        id_nivel: req.body.id_nivel
    }

    const categoria = new Categoria( data );

    await categoria.save();
    
    res.status(201).json({
        categoria
    });
}

const obtenerCategorias = async ( req, res = response) => {

    const { limite= 5, desde = 0} = req.params;
    //niveles activos
    const query = {estado: true};

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .populate('usuario', 'nombre')
            .populate('id_nivel', 'nivel')
            .skip( Number(desde) )
            .limit( Number( limite ) )
    ]);

    res.status(200).json({
        total, 
        categorias
    });

}

const obtenerCategoriasById = async ( req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('id_nivel', 'nivel');


    res.status(200).json({
        categoria
    });

}

const actualizarCategoria = async ( req, res = response) => {

    const { id } = req.params;
    const { id_nivel, estado, ...body } = req.body;

    const categoriaName = body.nombre_categoria.toUpperCase();
  
    const categoria = await Categoria.findByIdAndUpdate( id, { nombre_categoria: categoriaName }, { new: true } ) 
                                            .populate('id_nivel', 'nivel');


    res.status(201).json({
        categoria
    })

}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriasById,
    actualizarCategoria,

}