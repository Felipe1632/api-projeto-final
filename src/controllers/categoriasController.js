import { prisma } from '../lib/prisma.js';
import { ErroApi } from '../erros.js';

function lerId(texto) {
  const id = parseInt(texto, 10);
  if (isNaN(id) || id <= 0) {
    throw new ErroApi(400, 'ID deve ser um número válido');
  }
  return id;
}

// GET /api/categorias
export async function listar(req, res) {
  const categorias = await prisma.categoria.findMany({ orderBy: { nome: 'asc' } });
  res.json(categorias);
}

// GET /api/categorias/:id
export async function buscarPorId(req, res) {
  const id = lerId(req.params.id);
  const categoria = await prisma.categoria.findUnique({ where: { id } });

  if (!categoria) {
    throw new ErroApi(404, 'Categoria não encontrada');
  }

  res.json(categoria);
}

// POST /api/categorias
export async function criar(req, res) {
  const { nome } = req.body ?? {};
  if (typeof nome !== 'string' || nome.trim() === '') {
    throw new ErroApi(400, 'Dados inválidos', ['nome é obrigatório e precisa ser um texto']);
  }
  const nova = await prisma.categoria.create({ data: { nome: nome.trim() } });
  res.status(201).json(nova);
}

// PUT /api/categorias/:id
export async function atualizar(req, res) {
  const id = lerId(req.params.id);
  const { nome } = req.body ?? {};

  if (typeof nome !== 'string' || nome.trim() === '') {
    throw new ErroApi(400, 'Dados inválidos', ['nome é obrigatório e precisa ser um texto']);
  }

  const existe = await prisma.categoria.findUnique({ where: { id } });
  if (!existe) {
    throw new ErroApi(404, 'Categoria não encontrada');
  }

  const atualizada = await prisma.categoria.update({
    where: { id },
    data: { nome: nome.trim() },
  });

  res.json(atualizada);
}

// DELETE /api/categorias/:id
export async function excluir(req, res) {
  const id = lerId(req.params.id);

  const existe = await prisma.categoria.findUnique({ where: { id } });
  if (!existe) {
    throw new ErroApi(404, 'Categoria não encontrada');
  }

  await prisma.categoria.delete({ where: { id } });
  res.status(204).send();
}