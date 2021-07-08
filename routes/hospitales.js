//Path: api/hospitales

const { Router } = require('express');
const { check, validationResult, checkSchema } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validate-jwt');
const { getHospitales, crearHospital, actulizarHospital, borrarHospital } = require('../controllers/hospitales.controller');

const router = Router();

router.get('/', validarJWT, getHospitales);

router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital);

router.put('/:id',
    [
        validarJWT
    ],

    actulizarHospital);
router.delete('/:id', validarJWT, borrarHospital),

    module.exports = router;