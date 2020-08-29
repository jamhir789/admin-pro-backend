const validarJWT = (req, res, next) => {
    const jwt = require('jsonwebtoken');
    const token = req.header('x-token');

    if (!token) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        
        req.uid = uid

    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });

    }
    next();
}

module.exports = {
    validarJWT
}