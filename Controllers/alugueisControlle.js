const mysql = require('../mysql').pool;

exports.getAluguelFiltro = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            `SELECT u.nome, 
                    c.modelo, 
                    c.placa, 
                    a.dataRetirada, 
                    a.dataEntrega,
                    a.valorAluguel  
             FROM alugueis a 
                    JOIN carros c
                    ON a.idCarro = c.idCarro
                    JOIN clientes u 
                    ON a.idCliente = u.idCliente
             WHERE statusAluguel = 0`,
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado });
            }

        )
    })
}

exports.getAluguel = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM alugueis',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado });
            }

        )
    })
}

exports.novoAluguel = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query('SELECT * FROM clientes WHERE idCliente = ?',
            [req.body.idCliente], (error, result) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result[0].statusCliente === 1) {
                    res.status(409).send({
                        mensagem: 'Você não pode executar essa operação'
                    })
                } else {
                    if (error) { return res.status(500).send({ error: error }) };
                    conn.query(
                        `INSERT INTO alugueis (
                            dataReserva, 
                            dataRetirada, 
                            dataEntrega, 
                            qtdeDiasAlugados,
                            valorAluguel,
                            idCarro,
                            idCliente, 
                            statusAluguel
                                ) 
                                VALUES (?,?,?,?,?,?,?,?) `,
                        [
                            req.body.dataReserva,
                            req.body.dataRetirada,
                            req.body.dataEntrega,
                            req.body.qtdeDiasAlugados,
                            req.body.valorAluguel,
                            req.body.idCarro,
                            req.body.idCliente,
                            req.body.statusAluguel
                        ],
                        (error, result) => {
                            conn.release();

                            if (error) { res.status(500).send({ error: error, response: null }) }
                            const response = {
                                mensagem: 'Novo aluguel adicionado',
                                clienteCriado: {
                                    dataReserva: req.body.dataReserva,
                                    dataRetirada: req.body.dataRetirada,
                                    dataEntrega: req.body.dataEntrega,
                                    qtdeDiasAlugados: req.body.qtdeDiasAlugados,
                                    statusAlugeul: req.body.status
                                }
                            }

                            res.status(201).send(response)
                        })
                }
            })
    })
}

exports.getAluguelId = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM alugueis WHERE idAluguel = ?;',
            [req.params.idAluguel],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado });
            }

        )
    })
}

exports.alteraAluguel = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        console.log(conn)
        conn.query(
            `UPDATE alugueis
             SET  dataReserva  = ?,
             dataRetirada    = ?,
             dataEntrega      =?,
             qtdeDiasAlugados      =?,
             status   =?
             WHERE idAluguel = ?`,
            [
                req.body.dataReserva,
                req.body.dataRetirada,
                req.body.dataEntrega,
                req.body.qtdeDiasAlugados,
                req.body.status,
                req.body.idAluguel
            ],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(202).send({
                    mensagem: 'Aluguel alterado com sucesso',
                    idAluguel: resultado.insertId
                })
            }
        )
    })
}

exports.removeAluguel = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        try {
            if (error) { return res.status(500).send({ error: error }) };
            conn.query(
                `UPDATE alugueis 
             SET statusAluguel = 1
             WHERE idAluguel = ?`,

                [req.params.idAluguel],
                (error, resultado, field) => {
                    conn.release();
                    if (error) { res.status(500).send({ error: error, response: null }) }
                    res.status(202).send({
                        mensagem: 'Aluguel removido com sucesso',
                        idAluguel: resultado.insertIdAluguel
                    })
                }
            )
        } catch (error) {
            console.log('Esse aluguel não existe')
        }
    });
}