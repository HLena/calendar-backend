import dotenv from 'dotenv'
import express from 'express';
import { router }  from './routes/auth.js';


dotenv.config();
// Crear servidor de express
const app = express();


//Directorio púclico

app.use(express.static('public'));

//Rutas

app.use('/api/auth', router );

// Escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})