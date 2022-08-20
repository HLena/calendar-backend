import dotenv from 'dotenv'
import express from 'express';
import { dbConnection } from './database/config.js';
import { routerAuth }  from './routes/auth.js';
import { routerEvents }  from './routes/events.js';
import cors from 'cors';


dotenv.config();
// Crear servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

//Directorio púclico

app.use(express.static('public'));

//Lectura y parse del body
app.use(express.json());

//Rutas

app.use('/api/auth', routerAuth );
app.use('/api/events', routerEvents)

// Escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})