const express = require('express');
const cors = require('cors');
const path = require('path');
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


// Redirigir al Index si no encuentra la ruta
app.use('*', (req, res) => {
    res.sendFile( path.join(__dirname, 'public/index.html') );
})

// Escuchar peticiones
app.listen( process.env.PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})