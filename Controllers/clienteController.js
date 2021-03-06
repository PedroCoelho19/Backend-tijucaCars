const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.getClientes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM clientes',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado });
            }

        )
    })
}

exports.cadastraClientes = (req, res, next) => {
    mysql.getConnection((error, conn  ) => {
        conn.query('SELECT * FROM clientes WHERE email = ?',
            [req.body.email], (error, result, ) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length > 0) {
                    res.status(409).send({
                        mensagem: 'Email ja cadastrado'
                    })
                } else {
                    bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                        if (errBcrypt) { return res.status(500).send({ error: error }) };
                        conn.query(
                            `INSERT INTO clientes (
                        nome, 
                        cnh, 
                        dataNascimento, 
                        email, 
                        telefone, 
                        senha,
                        adm,
                        statusCliente
                        ) 
                        VALUES (?,?,?,?,?,?,?,?)`,
                            [
                                req.body.nome,
                                req.body.cnh,
                                req.body.dataNascimento,
                                req.body.email,
                                req.body.telefone,
                                hash,
                                req.body.admin,
                                req.body.status
                            ],
                            (error, result) => {
                                conn.release();

                                if (error) { res.status(500).send({ error: error, response: null }) }
                                const response = {
                                    mensagem: 'Cliente cadastrado com Sucesso!',
                                    clienteCriado: {
                                        modelo: req.body.nome,
                                        placa: req.body.cnh,
                                        ano: req.body.dataNascimento,
                                        cor: req.body.email,
                                        valorDiaAluguel: req.body.telefone,
                                        senha: hash,
                                        statusCliente: req.body.status
                                    }
                                }

                                res.status(201).send(response)
                            })

                    })
                }
            })


    })
}

exports.login = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = 'SELECT * FROM clientes WHERE email =?'
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({
                    mensagem: 'Falha na autentica????o'
                })
            }

            bcrypt.compare(req.body.senha, results[0].senha, (error, result) => {
                if (error) {
                    return res.status(401).send({
                        mensagem: 'Falha na autentica????o'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        idCliente: results[0].idCliente,
                        email: results[0].email,
                        adm: results[0].adm
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "2h"
                        })

                    return res.status(200).send({
                        mensagem: 'Autenticado com sucesso',
                        token: token,
                        adm: results[0].adm,
                        idCliente: results[0].idCliente
                    })
                }

                return res.status(401).send({ mensagem: 'Falha na autentica????o' })

            })

        })
    })
}

exports.getClienteId = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM clientes WHERE idCliente = ?;',
            [req.params.idCliente],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado });
            }

        )
    })
}

exports.alteraCliente = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        console.log(conn)
        conn.query(
            `UPDATE clientes
             SET nome   = ?,
                 email  = ?
             WHERE idCliente = ?`,
            [
                req.body.nome,
                req.body.email,
                req.body.idCliente
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
                    mensagem: 'Cliente alterado com sucesso',
                    idCliente: resultado.insertId
                })
            }
        )
    });
}

exports.removeCliente = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        try {
            if (error) { return res.status(500).send({ error: error }) };
            conn.query(
                'DELETE FROM clientes WHERE idCliente = ?', [req.params.idCliente],
                (error, resultado, field) => {
                    conn.release();
                    if (error) {
                        res.status(500).send({
                            error: error,
                            response: null
                        })
                    }
                    res.status(202).send({
                        mensagem: 'Cliente removido com sucesso',
                        idCarro: resultado.insertId
                    })
                }
            )

        } catch (error) {
            console.log(error.mensagem)
        }
    })
}