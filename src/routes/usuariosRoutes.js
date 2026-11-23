import { Router } from 'express';
import {
  listarUsuarios,
  buscarPorId,
  criar,
} from '../controllers/usuariosController.js';

const router = Router();

router.get('/', listarUsuarios);
router.get('/:id', buscarPorId);
router.post('/', criar);

export default router;