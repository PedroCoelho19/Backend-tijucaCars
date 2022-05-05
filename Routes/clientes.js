const express = require('express')
const router = express.Router();
const login = require('../Middleware/login')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const ClienteControllers = require('../Controllers/clienteController')

router.get(
    '/',
    ClienteControllers.getClientes
);
router.post(
    '/cadastroClientes',
    login.obrigatorio,
    ClienteControllers.cadastraClientes
);
router.get(
    '/:idCliente',
    ClienteControllers.getClienteId
)
router.post(
    '/Login',
    ClienteControllers.login
)
router.patch(
    '/',
    login.obrigatorio,
    ClienteControllers.alteraCliente
)
router.delete(
    '/',
    login.obrigatorio,
    ClienteControllers.removeCliente
)

module.exports = router;