const { Router } = require('express');
const { check, validationResult, checkSchema } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validate-jwt');
const expresfileUpload = require('express-fileupload');
const { fileUpload, getFile} = require('../controllers/upload.controller');
const router = Router();
 
router.use(expresfileUpload());
router.put('/:tipo/:id',fileUpload );
router.get('/:tipo/:foto',getFile);

module.exports = router;