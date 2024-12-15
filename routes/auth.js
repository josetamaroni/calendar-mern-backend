/*
    Rutas de Usuarios
    host + /api/auth/
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// crear nuevo usuario
router.post('/new', [ // Middleware
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de al menos 4 caracteres').isLength({ min: 4 }),
    validarCampos
],crearUsuario)

// Login del usuario
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de al menos 4 caracteres').isLength({ min: 4 }),
    validarCampos
], loginUsuario)

// Generar otro token
router.get('/renew', [
    validarJWT
],revalidarToken)

module.exports = router;