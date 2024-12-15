/*
    Rutas de Eventos
    host + /api/events/
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const { obtenerEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const router = Router();

//* Se valida el Token para todas la peticiones
router.use( validarJWT );

// Obtener Eventos
router.get('/', obtenerEventos)

// Crear nuevo Evento
router.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatorio').custom( isDate ),
    check('end', 'La fecha final es obligatorio').custom( isDate ),
    validarCampos
], crearEvento)

// Actualizar un Evento
router.put('/:id', actualizarEvento)

// Borrar un Evento
router.delete('/:id', borrarEvento)

module.exports = router;