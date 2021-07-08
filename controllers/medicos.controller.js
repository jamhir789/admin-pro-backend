const { response } = require('express');
const bcrypt = require('bcryptjs');
const Medico = require('../models/medico.model');
const { generateJWT } = require('../helpers/jwt');


const getMedicos = async (req, res) => {
    const medicos = await Medico.find().populate('hospital','nombre').populate('usuario','nombre img')
    try {
        res.json({
            ok: true,
            medicos,
        })
    } catch (error) {
        
    }
   
}

const crearMedico = async (req, res = response) => {
    console.log(req.body);
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    })

    try {
        const medicoDb = await medico.save();
        res.json({
            ok: true,
            msg: 'Se Creo medico',
            medico: medicoDb
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actulizarMedico = async (req, res = response) => {
    const uid = req.params.id;


    try {
        const existMedico = await Medico.findById(uid);



        if (!existMedico) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }
        //actualizar

        const { password, google, email, ...Campos } = req.body;

        if (existMedico.email !== req.body.email) {

            const existEmail = await Medico.findOne({ email });
            if (existEmail) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });

            }
        }
        //validar token

        Campos.email = email;
        const Medicoupdate = await Usuario.findByIdAndUpdate(uid, Campos, { new: true });


        res.status(202).json({
            ok: true,
            usuario: Medicoupdate
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error inesperado"
        });
    }
}

const borrarMedico = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const existMedico = await Medico.findById(uid);

        // return res.status(200).json({
        //     ok: false,
        //     usuario: existUSer
        // });

        if (!existMedico) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }
        await Medico.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: `Se elimino el usuario ${existMedico.email}`
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actulizarMedico,
    borrarMedico
}