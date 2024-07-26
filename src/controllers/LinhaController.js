import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getLinhas = (request, response) => {
  const sql = `SELECT * FROM linhas`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar linhas" });
      return;
    }
    response.status(200).json(data);
  });
};

export const cadastrarLinha = (request, response) => {
  const { nome_linha, numero_linha, itinerario } = request.body;

  if (!nome_linha || !numero_linha || !itinerario) {
    return response.status(400).json({
      msg: "Todos os campos são obrigatórios",
    });
  }

  const linha_id = uuidv4();
  const sql = `
      INSERT INTO linhas (linha_id, nome_linha, numero_linha, itinerario)
      VALUES (?, ?, ?, ?)
    `;
  const values = [linha_id, nome_linha, numero_linha, itinerario];

  conn.query(sql, values, (err) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro ao cadastrar linha" });
    }
    return response
      .status(201)
      .json({ message: "Linha cadastrado com sucesso", linha_id });
  });
};

export const getOnelinha = (req, res) => {
  const { linha_id } = req.params;

  const checkSqlId = "SELECT * FROM linhas WHERE id = ?";
  conn.query(checkSqlId, [linha_id], (err, data) => {
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
