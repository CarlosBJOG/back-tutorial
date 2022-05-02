const mongoose = require('mongoose');

const dbConnection = async () => {

    try{

        await mongoose.connect( process.env.MONGODB_CNN, {autoIndex:false} );
        console.log('BD ONLINE')

    }catch(e){
        console.log(e);
        throw new Error('Ocurrio un error al conectar la bd');

    }
}

module.exports = dbConnection