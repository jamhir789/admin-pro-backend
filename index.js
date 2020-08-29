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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));


app.listen(process.env.PORT, () => {
    console.log("servidor coriendo en el puerto " + process.env.PORT);
})