import { Router } from "express";
import { getLinhas, cadastrarLinha, getOnelinha, deletarlinha, editarlinha } from '../controllers/LinhaController.js';

const router = Router();

router.get('/', getLinhas);
router.post('/criar', cadastrarLinha);
router.get('/:linha_id', getOnelinha);
router.put('/editar/:linha_id', editarlinha);
router.delete('/:linha_id', deletarlinha);   

export { router }

