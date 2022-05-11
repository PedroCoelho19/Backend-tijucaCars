const express = require('express')
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../Middleware/login')

const CarrosControlles = require('../Controllers/carrosControllers')

router.get(
    '/carros',
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
    '/alterarCarro',
    login.obrigatorio,
    CarrosControlles.alteraCarro
);

router.delete(
    '/removeCarro/:idCarro',
    login.obrigatorio,
    CarrosControlles.removeCarro
);



module.exports = router;