const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Crear el servidor
const app = express();

// Base de datos
const { dbConnection } = require('./database/config');
dbConnection();

// Cors
app.use(cors());

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events') );


// Escuchar peticiones
app.listen( process.env.PORT,()=>{
    console.log(`Servidor corriendo en el puerto 4000`);
})