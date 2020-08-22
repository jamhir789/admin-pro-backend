const mongoose = require('mongoose');

const dbConection = async ()=>{
try {
    await  mongoose.connect(process.env.DB_CNN, {
        useNewUrlParser: true,
         useUnifiedTopology: true,       
        useCreateIndex:true
    });
    console.log('base de datos online');
} catch (error) {
    console.log(error);
    throw new Error ('Error al iniciar base de datos')
}
 

}

module.exports ={
    dbConection
} 