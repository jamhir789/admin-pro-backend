/*
Ruta : /api/usuarios

//para usar varios middleware sera el segundo argumento y para que sean varios
dedeb ir dentro de [{}]
*/
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { getUsuarios, crearUsuario, actulizarUsuario, borrarUsuario,getIdUsuario } = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/',  getUsuarios);

router.get('/:id', validarJWT,getIdUsuario)
router.post('/',

    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail().notEmpty(),
        validarCampos // el middleware debe llamarse despues de que surjan los errores
    ],
    crearUsuario);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail().notEmpty(),
        validarCampos // el middleware debe llamarse despues de que surjan los errores
    ],

    actulizarUsuario);
router.delete('/:id', validarJWT, borrarUsuario),

    module.exports = router;


    