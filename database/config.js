import mongoose from 'mongoose';


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online')
    } catch (error) {
        console.log(error);
        throw new Error('Error to start DB connection')
    }
}

export {
    dbConnection
}