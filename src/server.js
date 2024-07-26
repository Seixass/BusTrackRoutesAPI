import dotenv from "dotenv";
import express from "express";

// importando os models
import "./models/LinhasModel.js"
import "./models/MotoristasModel.js"
dotenv.config()

//importando as rotas
import { router as LinhasRoutes } from "./routes/linhaRoutes.js"
import { router as MotoristasRoutes } from "./routes/motoristaRoutes.js"

const PORT = process.env.PORT;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//utilização das rotas
app.use('/linhas', LinhasRoutes)
app.use('/motoristas', MotoristasRoutes)

app.listen(PORT, () => {
    console.log("Servidor rodando na porta: " + PORT);
  });