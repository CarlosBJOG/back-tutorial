const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoriasById, actualizarCategoria } = require('../controllers/categorias');
const { existeCategoria, categoriaIsActive, existeNivelById } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id',[
    check('id','El ID es obligatorio').not().isEmpty(),
    check('id','El ID es invalido').isMongoId(),
    check('id').custom(categoriaIsActive),
    validarCampos,
], obtenerCategoriasById);

router.post('/', [
    validarJWT,
    check('nombre_categoria', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('nombre_categoria').custom(existeCategoria),
    check('id_nivel', 'El id del nivel es requerido').not().isEmpty(),
    check('id_nivel', 'El id del nivel es invalido').isMongoId(),
    check('id_nivel').custom(existeNivelById),
    validarCampos
],crearCategoria);

router.put('/:id',[
    validarJWT,
    check('nombre_categoria', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('id','El ID es obligatorio').not().isEmpty(),
    check('id','El ID es invalido').isMongoId(),
    check('id').custom(categoriaIsActive),
    validarCampos,
], actualizarCategoria);


module.exports = router;
