import { Router } from "express";
import { listarServicos, buscarServicoPorId, criarServico, atualizarServico, excluirServico } from "../controllers/servicosController.js";

const router = Router();

router.get('/', listarServicos);
router.get('/:id', buscarServicoPorId);
router.post('/', criarServico);
router.put('/:id', atualizarServico);
router.delete('/:id', excluirServico);

export default router;