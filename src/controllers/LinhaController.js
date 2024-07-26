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
  const checkSqlId = `select * from linhas where linha_id = ?`;
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

export const deletarlinha = (request, response) => {
  const { linha_id } = request.params;

  const deleteSql = "DELETE FROM linhas WHERE linha_id = ?";

  conn.query(deleteSql, [linha_id], (err, info) => {
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

export const editarlinha = (req, res) => {
  const { linha_id } = req.params; // Alterado para usar a mesma nomenclatura
  console.log(`ID recebido: ${linha_id}`);
  const { nome_linha, numero_linha, itinerario } = req.body;

  // Validações adicionais
  if (!nome_linha || typeof nome_linha !== 'string') {
    return res.status(400).json({ msg: "O nome da linha é obrigatório e deve ser uma string" });
  }
  if (!numero_linha || typeof numero_linha !== 'number') {
    return res.status(400).json({ msg: "O número da linha é obrigatório e deve ser um número" });
  }
  if (!itinerario || typeof itinerario !== 'string') {
    return res.status(400).json({ msg: "O itinerário é obrigatório e deve ser uma string" });
  }

  const checkSql = `SELECT * FROM Linhas WHERE linha_id = ?`;
  conn.query(checkSql, [linha_id], (err, data) => {
      if (err) {
          console.error('Erro ao buscar linha:', err.message); // Melhoria no log
          return res.status(500).json({ msg: "Erro ao buscar linha" });
      }

      if (data.length === 0) {
          return res.status(404).json({ msg: "Linha não encontrada" });
      }

      const updateSql = `UPDATE Linhas SET nome_linha = ?, numero_linha = ?, itinerario = ? WHERE linha_id = ?`;
      const updateValues = [nome_linha, numero_linha, itinerario, linha_id];
      console.log('Valores de atualização:', updateValues);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

      conn.query(updateSql, updateValues, (err) => {
          if (err) {
              console.error('Erro ao atualizar linha:', err.message); // Melhoria no log
              return res.status(500).json({ msg: "Erro ao atualizar linha" });
          }
          res.status(200).json({ msg: "Linha atualizada com sucesso" });
      });
  });
};


