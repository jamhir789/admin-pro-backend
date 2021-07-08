require('dotenv').config();


const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger/swagger.json');

const express = require('express');
const cors = require('cors');
const { dbConection } = require('./database/config');


//crear servidor expres
const app = express();

//configurar cors --npm i cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());
//base de datos
dbConection();

//MONgo  USER-paswword
//user: erickmedina password:medina96

//rutas

app.use('/api-Hospital', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/busqueda',require('./routes/busqueda'));
app.use('/api/uploads',require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log("servidor coriendo en el puerto " + process.env.PORT);
})