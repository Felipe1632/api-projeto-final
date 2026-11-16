import { Router } from "express";
import { listarUsuarios, buscarPorId } from "../controllers/usuariosController.js";

const router = Router();

router.get('/', listarUsuarios);
router.get('/:id', buscarPorId);

export default router;