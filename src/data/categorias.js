// src/data/categorias.js
export const categorias = [
  { id: 1, nome: "Cabelo" },
  { id: 2, nome: "Barba" },
  { id: 3, nome: "Acabamento & Pezinho" },
  { id: 4, nome: "Tratamentos Capilares" },
  { id: 5, nome: "Combos" }
];

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