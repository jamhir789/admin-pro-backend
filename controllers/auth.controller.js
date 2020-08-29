const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const validarCampos = require('../middlewares/validar-campos');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body
    try {

        //verificar email 
        const UsuarioDb = await Usuario.findOne({ email });

        if (!UsuarioDb) {
            res.status(400).json({
                ok: true,
                msg: 'Verifique sus credenciales'
            });
        }

        //verificar password
        const validarPassword = bcrypt.compareSync(password, UsuarioDb.password);
        if (!validarPassword) {
            res.status(400).json({
                ok: true,
                msg: 'Verifique sus credenciales'
            });
        }
        const token = await generateJWT(UsuarioDb.id);
        ///geerar token 
        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }
}

module.exports = {
    login
}