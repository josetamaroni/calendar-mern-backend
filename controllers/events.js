const { response } = require('express');
const Evento = require('../models/Evento');

const obtenerEventos = async (req, res = response) => {

    try {
        const eventos = await Evento.find().populate('user', 'name email');
        res.status(200).send({
            ok: true,
            eventos
        })
    }catch(error){
        console.log('Error - controller - obtenerEventos', error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const crearEvento = async (req, res = response) => {

    try {
        // console.log( req )
        // Validar campos necesarios del Evento
        const evento = new Evento( req.body );
        // Inserto el Uid del usuario que esta creando el evento
        evento.user = req.uid;

        const eventoDB = await evento.save();

        res.status(201).send({
            ok: true,
            evento: eventoDB
        })
    }catch(error){
        console.log('Error - controller - crearEvento', error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const actualizarEvento = async (req, res = response) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById( eventoId );
        if( !evento ) {
            return res.status(404).send({
                ok: false,
                msg: 'Evento no existe'
            })
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).send({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.status(201).send({
            ok: true,
            msg: 'Actualizar Eventos',
            eventoActualizado
        })
    }catch(error){
        console.log('Error - controller - actualizarEvento', error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const borrarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById( eventoId );
        if( !evento ) {
            return res.status(404).send({
                ok: false,
                msg: 'Evento no existe'
            })
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).send({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete(eventoId);
        res.status(200).send({
            ok: true,
            msg: 'Evento eliminado'
        })
    }catch(error){
        console.log('Error - controller - borrarEvento', error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}