// Controller: as regras de cada operação do recurso "servicos".
import { servicos } from '../data/servicos.js';

// GET /api/servicos ou /api/servicos?categoriaId=1
export function listarServicos(req, res) {
  const { categoriaId } = req.query;

  if (categoriaId) {
    const catId = parseInt(categoriaId, 10);
    if (!isNaN(catId)) {
      const servicosFiltrados = servicos.filter((s) => s.categoriaId === catId);
      return res.json(servicosFiltrados);
    }
  }

  return res.json(servicos);
}

// GET /api/servicos/:id
export function buscarServicoPorId(req, res) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID deve ser um número válido' });
  }

  const servico = servicos.find((s) => s.id === id);

  if (!servico) {
    return res.status(404).json({ erro: 'Serviço não encontrado' });
  }

  return res.json(servico);
}