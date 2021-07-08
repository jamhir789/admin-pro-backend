const { response } = require('express');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/hospital.model');



const getHospitales = async (req, res = response) => {
    const hospital = await Hospital.find().populate('usuario','nombre')
    try {
        res.json({
            ok: true,
            hospital
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   
}

const crearHospital = async (req, res = response) => {
    console.log(req.body);

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    try {
        const hospitalDB = await hospital.save()
        res.json({
            ok: true,
            hospital: hospitalDB,
            msg: 'se creo Hospital'
        });
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const actulizarHospital = async (req, res = response) => {
    const uid = req.params.id;

    try {
        res.json({
            ok: true,
            msg: 'se actualizo Hospital'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarHospital = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'se borro hospital'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actulizarHospital,
    borrarHospital
}