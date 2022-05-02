const { response } = require("express")


const tieneRole = ( ...roles ) => {

    return (req, res = response, next ) => {
        if( !req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere verificar rol sin autenticacion de usuario'
            })
        }

        if( !roles.includes( req.usuario.rol )) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })

        }

        next();
    }
}

module.exports = {
    tieneRole
}
