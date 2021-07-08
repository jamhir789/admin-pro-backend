const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const { generateJWT } = require('../helpers/jwt');



const getIdUsuario = async(req,res)=>{
    const uid = req.params.id;
    try {
        const UserId = await Usuario.findById(uid);

        if (!UserId) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }
     
    res.json({
        ok: true,
        UserId,
    })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error inesperado"
        }); 
    }
}

const getUsuarios = async (req, res) => {
    const size = Number(req.query.size) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, '').skip(size).limit(size),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async (req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const existEmail = await Usuario.findOne({ email });

        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //encriptrar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        //generar token
        const token = await generateJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Se creo usuario',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado revisar log'
        })
    }


}

const actulizarUsuario = async (req, res = response) => {
    const uid = req.params.id;


    try {
        const existUSer = await Usuario.findById(uid);



        if (!existUSer) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }
        //actualizar

        const { password, google, email, ...Campos } = req.body;

        if (existUSer.email !== req.body.email) {

            const existEmail = await Usuario.findOne({ email });
            if (existEmail) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });

            }
        }
        //validar token

        Campos.email = email;
        const Userupdate = await Usuario.findByIdAndUpdate(uid, Campos, { new: true });


        res.status(202).json({
            ok: true,
            usuario: Userupdate
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error inesperado"
        });
    }
}

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const existUSer = await Usuario.findById(uid);

        // return res.status(200).json({
        //     ok: false,
        //     usuario: existUSer
        // });

        if (!existUSer) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: `Se elimino el usuario ${existUSer.email}`
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actulizarUsuario,
    borrarUsuario,
    getIdUsuario
}