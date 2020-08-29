/*
Path : /api/login
para usar varios middleware sera el segundo argumento y para que sean varios
dedeb ir dentro de [{}]
*/

const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail().notEmpty(),
        check('password', 'El password es obligatorio').notEmpty(),
        validarCampos

    ],
    login
)

module.exports = router;