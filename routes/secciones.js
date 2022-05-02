const { Router } = require('express');
const { check } = require('express-validator');

const { crearSeccion, obtenerSecciones, obtenerSeccionesById, actualizarSeccion, desactivarSeccion } = require('../controllers/seccion');
const { existeSeccion, seccionIsActive, existeCategoriaById } = require('../helpers/db-validators');

const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarNombreSeccion } = require('../middlewares/validarSeccion');

const router = Router();

router.post('/', [
    validarJWT,
    check('nombre_seccion', 'El Nombre de la seccion es obligatorio').not().isEmpty(),
    validarNombreSeccion,
    check('id_categoria', 'El id es obligatorio').not().isEmpty(),
    check('id_categoria', 'El id es invalido').isMongoId(),
    check('id_categoria').custom( existeCategoriaById ),

    validarCampos,
],crearSeccion);

router.get('/', obtenerSecciones);

router.get('/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'El id No es valido').isMongoId(),
    check('id').custom( existeSeccion ),
    check('id').custom( seccionIsActive ),

    validarCampos,
], obtenerSeccionesById);

router.put('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'El id No es valido').isMongoId(),
    check('id').custom( existeSeccion ),
    check('id').custom( seccionIsActive ),

    validarCampos
], actualizarSeccion);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'El id No es valido').isMongoId(),
    check('id').custom( existeSeccion ),

    validarCampos
], desactivarSeccion);




module.exports = router;