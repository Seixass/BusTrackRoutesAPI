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
  
    const linha_id = uuidv4();
    const sql = `
        INSERT INTO linhas (linha_id, nome_linha, numero_linha, itinerario)
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
        .json({ message: "Motorista cadastrado com sucesso", linha_id });
    });
};

  export const getOneMotorista = (req, res) => {
    const { motorista_id } = req.params;
  
    const checkSqlId = "SELECT * FROM motorista WHERE id = ?";
    conn.query(checkSqlId, [motorista_id], (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao buscar o motorista escolhido!" });
      }
  
      if (data.length === 0) {
        return res
          .status(404)
          .json({ message: "motorista não encontrado na base de dados!" });
      }
  
      return res.status(200).json(data);
    });
};