const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/generarJwt');
const { googleVerify } = require('../helpers/google-verify');

const Usuario = require('../models/usuario');


const login = async ( req, res = response) => {

    const {correo, password} = req.body;

    try{

        const usuario = await Usuario.findOne({ correo });
        
        if(!usuario) return res.status(400).json({ msg: "Usuario / Password incorrectos - correo" });
        if( !usuario.estado ) return res.status(400).json({ msg: "Usuario / Password incorrectos - estado: false" });

        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ) return res.status(400).json({msg: "Usuario / Password Incorrectos - password"})

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            msg: 'hable con el administrador'
        })
    }

}

const googleSignIn = async ( req, res = response) => {

    const { id_token } = req.body;

    try{

        const { nombre, img, correo} = await googleVerify(id_token);
        let usuario = await Usuario.findOne({ correo });
        if(!usuario){
            
            const data = {
                nombre, 
                correo, 
                password: ':p',
                img,
                google: true,
                rol: 'USER_ROLE'
            }
            usuario = new Usuario( data );
            await usuario.save();
        }

        if( !usuario.estado) return res.status(401).json({ msg: 'Hable con el administrador, usuario bloqueado'});

        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });

    }catch(err){
        console.log(err);
        res.status(400).json({ok: false, msg: 'El token no se pudo verificar'});
    }


}

module.exports = {
    login,
    googleSignIn
}