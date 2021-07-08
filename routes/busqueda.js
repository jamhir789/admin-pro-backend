const { Router } = require('express');
const { check, validationResult, checkSchema } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validate-jwt');
const { getTodo,getTable} = require('../controllers/busqueda.controller');

const router = Router();

router.get('/:busqueda', validarJWT, getTodo);
router.get('/:tabla/:busqueda',validarJWT,getTable)
module.exports = router;
