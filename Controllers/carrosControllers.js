const mysql = require("../mysql").pool;

exports.getCarros = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM carros", (error, resultado, fields) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      return res.status(200).send({ response: resultado });
    });
  });
};

exports.getCarrosDisponiveis = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM carros WHERE statusCarro = 3",
      (error, resultado, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({ response: resultado });
      }
    );
  });
};

exports.cadastroCarro = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    conn.query(
      "SELECT * FROM carros WHERE placa = ?",
      [req.body.placa],
      (error, result) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length > 0) {
          res.status(409).send({
            mensagem: "Placa ja cadastrado",
          });
        } else {
          if (error) {
            return res.status(500).send({ error: error });
          }
          conn.query(
            `INSERT INTO carros (
                            modelo, 
                            placa, 
                            ano, 
                            cor, 
                            valorDiaAluguel, 
                            statusCarro) 
                            VALUES (?,?,?,?,?,?)`,
            [
              req.body.modelo,
              req.body.placa,
              req.body.ano,
              req.body.cor,
              req.body.valorDiaAluguel,
              req.body.status,
            ],
            (error, result) => {
              conn.release();

              if (error) {
                res.status(500).send({ error: error, response: null });
              }
              const response = {
                mensagem: "Carro Criado com sucesso",
                clienteCriado: {
                  modelo: req.body.modelo,
                  placa: req.body.placa,
                  ano: req.body.ano,
                  cor: req.body.cor,
                  valorDiaAluguel: req.body.valorDiaAluguel,
                  status: req.body.status,
                },
              };

              res.status(201).send(response);
            }
          );
        }
      }
    );
  });
};

exports.getCarrosId = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM carros WHERE idCarro = ?;",
      [req.params.idCarro],
      (error, resultado, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({ response: resultado });
      }
    );
  });
};

exports.getInsertCode = (req, res, next) => {
  return res.status(200).send({ response: "Adicione um idCarro para a rota!" });
};

exports.alteraCarro = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    console.log(conn);
    conn.query(
      `UPDATE carros
             SET modelo   = ?,
                 placa    = ?,
                 ano      =?,
                 cor      =?,
                 valorDiaAluguel  =?,
                 status   =?
             WHERE idCarro = ?`,
      [
        req.body.modelo,
        req.body.placa,
        req.body.ano,
        req.body.cor,
        req.body.valorDiaAluguel,
        req.body.status,
        req.body.idCarro,
      ],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        res.status(202).send({
          mensagem: "Carro alterado com sucesso",
          idCarro: resultado.insertId,
        });
      }
    );
  });
};

exports.removeCarro = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    try {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        "DELETE FROM carros WHERE idCarro = ?",
        [req.params.idCarro],
        (error, resultado, field) => {
          conn.release();
          if (error) {
            res.status(500).send({
              error: error,
              response: null,
            });
          }
          res.status(202).send({
            mensagem: "Carro removido com sucesso",
            idCarro: resultado.insertId,
          });
        }
      );
    } catch (error) {
      console.log(error.mensagem);
    }
  });
};
