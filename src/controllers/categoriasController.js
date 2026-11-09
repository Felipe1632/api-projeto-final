// Controller: as regras de cada operação do recurso "categorias".
import { categorias } from '../data/categorias.js';

// GET /api/categorias
export function listarCategorias(req, res) {
  res.json(categorias);
}

// GET /api/categorias/:id
export function buscarCategoriaPorId(req, res) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID deve ser um número válido' });
  }

  const categoria = categorias.find((c) => c.id === id);

  if (!categoria) {
    return res.status(404).json({ erro: 'Categoria não encontrada' });
  }

  return res.json(categoria);
}