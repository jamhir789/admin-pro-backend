const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');



const fileUpload = (req, res = response) => {
    const { actualizarImagen } = require('../helpers/actualizar-imagen');

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({

            ok: false,
            msg: 'No es un medico,hospital o usuario'
        });
    }


    ///validacion de archivos
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    ///procesar imagen...
    const file = req.files.imagen;
    const nameCut = file.name.split('.')//Obtener nombre
    const extencionFile = nameCut[nameCut.length - 1]

    //validar extencion
    const extenValid = ['jpg', 'png', 'jpeg', 'gif'];
    if (!extenValid.includes(extencionFile)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo de archivo no es valido'
        });
    }

    //generar el nombre del archivo

    const nombreFile = `${uuidv4()}.${extencionFile}`

    //path para guardar imagen
    const path = `./uploads/${tipo}/${nombreFile}`;

    //mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        //Actualizar base de datos
        actualizarImagen(tipo,id,path,nombreFile);
        res.json({
            ok: true,
            msg: "File Uploaded",
            nombreFile
        });
    });





}

const getFile = (req,res = response)=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);
//imaagen no disponible
if(fs.existsSync(pathImg)){

    res.sendFile(pathImg)
}else{
    const pathImg = path.join(__dirname,`../uploads/noImg.jpg`);
    res.sendFile(pathImg)
}


}

module.exports = {
    fileUpload,
    getFile
}