export const servicos = [
  { id: 1, categoriaId: 1, nome: "Corte Social", preco: 45.00, duracaoMinutos: 40 },
  { id: 2, categoriaId: 1, nome: "Corte Degradê", preco: 50.00, duracaoMinutos: 45 },
  { id: 3, categoriaId: 2, nome: "Barba Completa", preco: 35.00, duracaoMinutos: 30 },
  { id: 4, categoriaId: 2, nome: "Barboterapia", preco: 50.00, duracaoMinutos: 40 },
  { id: 5, categoriaId: 5, nome: "Combo Cabelo + Barba", preco: 75.00, duracaoMinutos: 60 }
];

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