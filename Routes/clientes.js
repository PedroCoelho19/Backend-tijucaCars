const express = require('express')
const router = express.Router();
const login = require('../Middleware/login')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const ClienteControllers = require('../Controllers/clienteController')

router.get(
    '/clientes',
    ClienteControllers.getClientes
);
router.post(
    '/cadastro',
    login.obrigatorio,
    ClienteControllers.cadastraClientes
);
router.get(
    '/:idCliente',
    ClienteControllers.getClienteId
)
router.post(
    '/login',
    ClienteControllers.login
)
router.patch(
    '/editarCliente',
    login.obrigatorio,
    ClienteControllers.alteraCliente
)
router.delete(
    '/removeCliente/:idCliente',
    login.obrigatorio,
    ClienteControllers.removeCliente
)

module.exports = router;