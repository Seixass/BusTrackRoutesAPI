import { Router } from "express";
import { getLinhas, cadastrarLinha, getOnelinha } from '../controllers/LinhaController.js';

const router = Router();

router.get('/', getLinhas);
router.post('/criar', cadastrarLinha);
router.get('/:id', getOnelinha);
// router.put('/linhas/:id', editarlinha);
// router.delete('/linhas/:id', deletarlinha);

export { router }

