const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

    } catch (error) {

        throw new Error('Error al iniciar base de datos')
    }


}

module.exports = {
    dbConection
} 