import { Router } from "express";
import { getMotorista, cadastrarMotorista, getOneMotorista } from '../controllers/LinhaController.js';

const router = Router();

router.get('/', getMotorista);
router.post('/criar', cadastrarMotorista);
router.get('/:id', getOneMotorista);
// router.put('/linhas/:id', editarlinha);
// router.delete('/linhas/:id', deletarlinha);

export { router }