//Path: api/hospitales

const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validate-jwt');
const { getMedicos, crearMedico, actulizarMedico, borrarMedico } = require('../controllers/medicos.controller');

const router = Router();

router.get('/', validarJWT, getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos

    ],
    crearMedico);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos

    ],

    actulizarMedico);
router.delete('/:id', validarJWT, borrarMedico),

    module.exports = router;