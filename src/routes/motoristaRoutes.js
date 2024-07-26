import { Router } from "express";
import { getMotorista, cadastrarMotorista, getOneMotorista, deletarMotorista } from '../controllers/MotoristasController.js';

const router = Router();

router.get('/', getMotorista);
router.post('/criar', cadastrarMotorista);
router.get('/:motorista_id', getOneMotorista);
router.delete('/:motorista_id', deletarMotorista);

export { router }