require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConection } = require('./database/config');

//crear servidor expres
const app = express();

//configurar cors --npm i cors
app.use(cors());

//base de datos
dbConection();
// console.log(process.env);
//MONgo  USER-paswword
//user: erickmedina password:medina96
//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'hola mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log("servidor coriendo en el puerto " + process.env.PORT);
})