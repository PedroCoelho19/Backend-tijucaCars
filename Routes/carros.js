const express = require('express')
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../Middleware/login')

const CarrosControlles = require('../Controllers/carrosControllers')

router.get(
    '/',
    CarrosControlles.getCarros
);

router.post(
    '/cadastro',
    login.obrigatorio,
    CarrosControlles.cadastroCarro
);

router.get(
    '/:idCarro',
    CarrosControlles.getCarrosId
);

router.patch(
    '/',
    login.obrigatorio,
    CarrosControlles.alteraCarro
);

router.delete(
    '/',
    login.obrigatorio,
    CarrosControlles.removeCarro
);



module.exports = router;