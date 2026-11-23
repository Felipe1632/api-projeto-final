import { prisma } from '../lib/prisma.js';
import { ErroApi } from '../erros.js';

function lerId(texto) {
  const id = Number(texto);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ErroApi(400, 'O id precisa ser um número inteiro positivo');
  }
  return id;
}

// GET /api/servicos
export async function listar(req, res) {
  const servicos = await prisma.servico.findMany({
    include: { categoria: true },
    orderBy: { id: 'asc' },
  });
  res.json(servicos);
}

// GET /api/servicos/:id
export async function buscarPorId(req, res) {
  const id = lerId(req.params.id);
  const servico = await prisma.servico.findUnique({
    where: { id },
    include: { categoria: true },
  });

  if (!servico) {
    throw new ErroApi(404, 'Serviço não encontrado');
  }

  res.json(servico);
}

// POST /api/servicos
export async function criar(req, res) {
  const { nome, duracaoMin, preco, status, categoriaId } = req.body ?? {};
  const erros = [];

  if (typeof nome !== 'string' || nome.trim() === '') {
    erros.push('nome é obrigatório e precisa ser um texto');
  }
  if (!categoriaId || !Number.isInteger(Number(categoriaId)) || Number(categoriaId) <= 0) {
    erros.push('categoriaId é obrigatório e precisa ser um número inteiro positivo');
  }
  if (duracaoMin !== undefined && (!Number.isInteger(Number(duracaoMin)) || Number(duracaoMin) <= 0)) {
    erros.push('duracaoMin precisa ser um número inteiro maior que zero');
  }
  if (preco !== undefined && (isNaN(Number(preco)) || Number(preco) < 0)) {
    erros.push('preco precisa ser um número maior ou igual a zero');
  }

  if (erros.length > 0) {
    throw new ErroApi(400, 'Dados inválidos', erros);
  }

  const categoria = await prisma.categoria.findUnique({
    where: { id: Number(categoriaId) },
  });
  if (!categoria) {
    throw new ErroApi(400, 'categoriaId não existe');
  }

  const novo = await prisma.servico.create({
    data: {
      nome: nome.trim(),
      duracaoMin: duracaoMin !== undefined ? Number(duracaoMin) : undefined,
      preco: preco !== undefined ? Number(preco) : undefined,
      status: status ?? undefined,
      categoriaId: categoria.id,
    },
    include: { categoria: true },
  });

  res.status(201).json(novo);
}

// PUT /api/servicos/:id
export async function atualizar(req, res) {
  const id = lerId(req.params.id);
  const existe = await prisma.servico.findUnique({ where: { id } });

  if (!existe) {
    throw new ErroApi(404, 'Serviço não encontrado');
  }

  const { nome, duracaoMin, preco, status, categoriaId } = req.body ?? {};

  if (nome !== undefined && (typeof nome !== 'string' || nome.trim() === '')) {
    throw new ErroApi(400, 'Dados inválidos', ['nome não pode ficar vazio']);
  }

  const atualizado = await prisma.servico.update({
    where: { id },
    data: {
      ...(nome !== undefined && { nome: nome.trim() }),
      ...(duracaoMin !== undefined && { duracaoMin: Number(duracaoMin) }),
      ...(preco !== undefined && { preco: Number(preco) }),
      ...(status !== undefined && { status }),
      ...(categoriaId !== undefined && { categoriaId: Number(categoriaId) }),
    },
    include: { categoria: true },
  });

  res.json(atualizado);
}

// DELETE /api/servicos/:id
export async function excluir(req, res) {
  const id = lerId(req.params.id);
  const existe = await prisma.servico.findUnique({ where: { id } });

  if (!existe) {
    throw new ErroApi(404, 'Serviço não encontrado');
  }

  await prisma.servico.delete({ where: { id } });
  res.status(204).send();
}