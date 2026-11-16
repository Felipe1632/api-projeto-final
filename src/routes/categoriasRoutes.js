import { Router } from "express";
import { listarCategorias, buscarCategoriaPorId } from "../controllers/categoriasController.js";

const router = Router();

router.get('/', listarCategorias);
router.get('/:id', buscarCategoriaPorId);

export default router;