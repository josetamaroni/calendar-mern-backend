const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        //* Validar que el email no exista en la BD
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            })
        }

        // Se crea una instancia de Uusario
        usuario = Usuario( req.body );

        //* Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar en la base de datos
        await usuario.save();
        
        //* Genero el token con la informacion del id del usuario
        const token = await generarJWT( usuario.id, usuario.name );
        
        res.status(201).send({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    }catch(error){
        console.log('Error - controller - crearUsuario', error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        //* Verificar que existe el emal
        let usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o Password no son correcto'
            })
        }

        //* Verificar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok:false,
                msg:'Password no es correcto'
            })
        }

        //* Genero el token con la informacion del id del usuario
        const token = await generarJWT( usuarioDB.id, usuarioDB.name );

        res.json({
            ok: true,
            uid: usuarioDB.id,
            name: usuarioDB.name,
            token
        })
        
    } catch (error) {
        console.log('Error - controller - loginUsuario', error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    //* Genero el token con la informacion del id del usuario
    const token = await generarJWT( uid, name );

    res.send({
        ok: true,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}