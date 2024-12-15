const jwt = require('jsonwebtoken');

// Funcion para obtener un token
const generarJWT = ( uid, name ) => {

    return new Promise( ( resolve, reject ) => {
        const payload = { uid, name }
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (error, token) => {
            if(error){
                console.log('Error - helpers - generarJWT', error);
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}