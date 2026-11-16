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

// POST /api/servicos
export function criarServico(req, res) {
  const { categoriaId, nome, preco, duracaoMinutos } = req.body ?? {};

  if (!nome || preco === undefined) {
    return res.status(400).json({ erro: 'Os campos nome e preco são obrigatórios' });
  }

  const novoId = servicos.length > 0 ? servicos[servicos.length - 1].id + 1 : 1;

  const novo = {
    id: novoId,
    categoriaId: categoriaId ?? 1,
    nome,
    preco: Number(preco),
    duracaoMinutos: duracaoMinutos ?? 30,
  };

  servicos.push(novo);
  return res.status(201).json(novo);
}

// PUT /api/servicos/:id
export function atualizarServico(req, res) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID deve ser um número válido' });
  }

  const posicao = servicos.findIndex((s) => s.id === id);

  if (posicao === -1) {
    return res.status(404).json({ erro: 'Serviço não encontrado' });
  }

  const dados = req.body ?? {};

  if (dados.nome === '') {
    return res.status(400).json({ erro: 'O campo nome não pode ficar vazio' });
  }

  // Junta o que já existia com o que chegou; o id nunca muda
  const atualizado = { ...servicos[posicao], ...dados, id };
  servicos[posicao] = atualizado;

  return res.json(atualizado);
}

// DELETE /api/servicos/:id
export function excluirServico(req, res) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID deve ser um número válido' });
  }

  const posicao = servicos.findIndex((s) => s.id === id);

  if (posicao === -1) {
    return res.status(404).json({ erro: 'Serviço não encontrado' });
  }

  servicos.splice(posicao, 1);
  return res.status(204).send();
}