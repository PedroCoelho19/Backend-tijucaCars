const express = require('express')
const router = express.Router();
const login = require('../Middleware/login')

const AlugueisControlles = require('../Controllers/alugueisControlle')

router.get(
    '/filtroAluguel',
    login.obrigatorio,
    AlugueisControlles.getAluguelFiltro
);

router.get(
    '/alugueis',
    login.obrigatorio,
    AlugueisControlles.getAluguel
)

router.post(
    '/novoAluguel',
    AlugueisControlles.novoAluguel
);

router.get(
    '/:idAluguel',
    AlugueisControlles.getAluguelId
);

router.patch(
    '/alteraAluguel',
    AlugueisControlles.alteraAluguel
);

router.patch(
    '/removeAluguel/:idAluguel',
    AlugueisControlles.removeAluguel
    )

module.exports = router;