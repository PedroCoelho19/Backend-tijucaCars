const express = require('express')
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../Middleware/login')

const CarrosControlles = require('../Controllers/carrosControllers')

router.get(
    '/carros',
    CarrosControlles.getCarros
);

router.get(
    '/carrosDisponiveis',
    login.obrigatorio,
    CarrosControlles.getCarrosDisponiveis
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

router.get(
    '/',
    CarrosControlles.getInsertCode
)

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