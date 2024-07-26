import { Router } from "express";
import { cadastrarOnibus, getOnibus } from '../controllers/OnibusController.js';

const router = Router();

router.get('/', getOnibus);
router.post('/criar', cadastrarOnibus);

export { router }