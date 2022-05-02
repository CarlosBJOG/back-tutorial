const bcryptjs = require("bcryptjs");
const { encriptarHash } = require("../helpers/encriptar");
const { generarJWT } = require("../helpers/generarJwt");

const Usuario = require("../models/usuario");


const getUsuarios = async ( req, res ) => {

    const {limite = 5, desde = 0} = req.query;

    const query = { estado: true };

    const [total, usuarios]  = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]) 
    
    res.status(200).json({
        total,
        usuarios
    })

}

const getUsuariosById = async ( req, res ) => {

    const { id } = req.params;
    
    const usuario = await Usuario.findById( id );

    res.status( 200 ).json({
        usuario
    })

}

const postUsuarios = async (req, res) => {
    try{

        const {nombre, correo, password, rol} = req.body;
        const usuario = new Usuario({nombre, correo, password, rol});
    
        const salt = bcryptjs.genSaltSync();
    
        usuario.password = bcryptjs.hashSync(password, salt);
        
        await usuario.save();

    
        const token = await generarJWT(usuario.id, usuario.nombre, usuario.rol)
    
        res.status(201).json({
            usuario,
            token
        })
    }catch(e){
        console.error(e);
        return res.status(500).json({
            msg: 'hable con el administrador'
        })
    }
}
const putUsuarios = async (req, res) => {
    
    const { id } = req.params;
    const {_id, password, google, correo, ...resto } = req.body;

    if( password ) resto.password = encriptarHash( password );
    if( correo ) resto.correo = correo;

    const usuario = await Usuario.findByIdAndUpdate( id, resto, {new : true});

    res.json( usuario )
}

const deleteUsuarios = async (req, res) => {

    const { id } = req.params;
    
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }, { new: true });

    res.json({
        usuario,

    })
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
    getUsuariosById
}