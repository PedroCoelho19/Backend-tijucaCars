const mysql = require('../mysql').pool;

exports.getCarros = (req, res, next) => {
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

exports.novoAluguel =  (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            `INSERT INTO alugueis (
                dataReserva, 
                dataRetirada, 
                dataEntrega, 
                qtdeDiasAlugados, 
                status
                    ) 
                    VALUES (?,?,?,?,?)
                
                    
                ` 
             
                    ,
            [
                req.body.dataReserva,
                req.body.dataRetirada,
                req.body.dataEntrega,
                req.body.qtdeDiasAlugados,
                req.body.status
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
                        status: req.body.status
                    }
                }

                res.status(201).send(response)
            })
    })
}

exports.getAluguelId =  (req, res, next) => {

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
        if (error) { return res.status(500).send({ error: error }) };
        console.log(conn)
        conn.query(
            'DELETE FROM alugueis WHERE idAluguel = ?', [req.body.idAluguel],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(202).send({
                    mensagem: 'Aluguel removido com sucesso',
                    id_produto: resultado.insertId
                })
            }
        )
    });
}
