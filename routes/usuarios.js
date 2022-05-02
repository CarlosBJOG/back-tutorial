
const { Router } = require("express");
const { check } = require("express-validator");

const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, getUsuariosById } = require("../controllers/usuarios");
const { emailValido, esRoleValido, existeUsuarioById } = require("../helpers/db-validators");
const { validarJWT } = require("../middlewares/validar-JWT");
const { validarCampos } = require("../middlewares/validarCampos");
const { tieneRole } = require("../middlewares/validarRoles");

const router =  Router();

router.get('/', getUsuarios);

router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioById ),
    validarCampos
], getUsuariosById);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password debe de ser mas de 6 letras').isLength( {min: 6} ),
    check('correo').custom( emailValido ),
    check('rol').custom( esRoleValido ),
    validarCampos
],postUsuarios);

router.put('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'), //CAMBIAR EL ROL A UNICAMENTE ADMIN
    check('id', 'No es un ID valido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo').custom( emailValido ),
    validarCampos
],putUsuarios);

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'), //CAMBIAR EL ROL A UNICAMENTE ADMIN
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioById ),
    validarCampos,
], deleteUsuarios);






module.exports = router;