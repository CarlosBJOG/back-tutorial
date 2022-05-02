const { Router } = require('express');
const { check } = require('express-validator');
const { postNiveles, getNiveles, deleteNiveles } = require('../controllers/niveles');
const { existeNivel, existeNivelById, nivelIsActive } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require('../middlewares/validarCampos');
const { tieneRole } = require('../middlewares/validarRoles');

const router = Router();

router.post('/',[
    validarJWT,
    check('nivel', 'El nivel es requerido').not().isEmpty(),
    check('nivel').custom(existeNivel),
    validarCampos
], postNiveles);

router.get('/', getNiveles);

router.delete('/:id', [
    validarJWT,
    tieneRole( 'ADMIN_ROLE' ),
    check('id', 'El ID es obligatorio').not().isEmpty(),
    check('id', 'El ID no es valido').isMongoId(),
    check('id').custom( existeNivelById ),
    check('id').custom( nivelIsActive ),

    validarCampos
],deleteNiveles);


module.exports = router;