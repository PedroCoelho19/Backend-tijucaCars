const express = require('express')
const router = express.Router();
const login = require('../Middleware/login')

const AlugueisControlles = require('../Controllers/alugueisControlle')

router.get(
    '/',
    AlugueisControlles.getAluguel
);

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

router.delete(
    '/removeAluguel',
    AlugueisControlles.removeAluguel
    )

module.exports = router;