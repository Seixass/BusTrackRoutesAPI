import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getMotorista = (request, response) => {
  const sql = `SELECT * FROM motoristas`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar motoristas" });
      return;
    }
    response.status(200).json(data);
  });
};

export const cadastrarMotorista = (request, response) => {
  const { nome_motorista, data_nascimento, numero_carteira_habilitacao } = request.body;
  if (!nome_motorista || !data_nascimento || !numero_carteira_habilitacao) {
    return response.status(400).json({
      msg: "Todos os campos são obrigatórios",
    });
  }

  const motorista_id = uuidv4();
  const sql = `
      INSERT INTO motoristas (motorista_id, nome_motorista, data_nascimento, numero_carteira_habilitacao)
      VALUES (?, ?, ?, ?)
    `;
  const values = [motorista_id, nome_motorista, data_nascimento, numero_carteira_habilitacao];

  conn.query(sql, values, (err) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro ao cadastrar motorista" });
    }
    return response
      .status(201)
      .json({ message: "motorista cadastrado com sucesso", motorista_id });
  });
};

export const getOneMotorista = (req, res) => {
  const { motorista_id } = req.params;
  const checkSqlId = `select * from motoristas where motorista_id = ?`;
  conn.query(checkSqlId, [motorista_id], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar a linha escolhida!" });
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Linha não encontrada na base de dados!" });
    }

    return res.status(200).json(data);
  });
};

export const deletarMotorista = (request, response) => {
  const { motorista_id } = request.params;

  const deleteSql = "DELETE FROM motoristas WHERE motorista_id = ?";

  conn.query(deleteSql, [motorista_id], (err, info) => {
    if (err) {
      console.error('Database query error:', err);

      return response.status(500).json({ message: "Erro ao deletar a linha" });
    }

    if (info.affectedRows === 0) {
      return response.status(404).json({ message: "Linha não encontrada" });
    }

    return response.status(200).json({ message: "Linha deletada com sucesso" });
  });
};