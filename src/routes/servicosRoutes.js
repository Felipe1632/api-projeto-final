import { Router } from 'express';
import { listar, buscarPorId, criar, atualizar, excluir, alterarStatus } from '../controllers/servicosController.js';

const router = Router();

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', excluir);
router.patch('/:id/status', alterarStatus);

export default router;