// Controller: as regras de cada operação do recurso "usuarios".
import { prisma } from '../lib/prisma.js';
import { ErroApi } from '../erros.js';

function lerId(texto) {
  const id = Number(texto);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ErroApi(400, 'O id precisa ser um número inteiro positivo');
  }
  return id;
}

// GET /api/usuarios
export async function listarUsuarios(req, res) {
  const usuarios = await prisma.usuario.findMany({
    select: { id: true, nome: true, email: true, criadoEm: true },
    orderBy: { id: 'asc' },
  });
  res.json(usuarios);
}

// GET /api/usuarios/:id
export async function buscarPorId(req, res) {
  const id = lerId(req.params.id);
  const usuario = await prisma.usuario.findUnique({
    where: { id },
    select: { id: true, nome: true, email: true, criadoEm: true },
  });

  if (!usuario) {
    throw new ErroApi(404, 'Usuário não encontrado');
  }

  res.json(usuario);
}

// POST /api/usuarios
export async function criar(req, res) {
  const { nome, email, senha } = req.body ?? {};
  const erros = [];

  if (typeof nome !== 'string' || nome.trim() === '') {
    erros.push('nome é obrigatório e precisa ser um texto');
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    erros.push('email é obrigatório e precisa ser válido');
  }
  if (typeof senha !== 'string' || senha.trim().length < 4) {
    erros.push('senha é obrigatória e precisa ter pelo menos 4 caracteres');
  }

  if (erros.length > 0) {
    throw new ErroApi(400, 'Dados inválidos', erros);
  }

  const novo = await prisma.usuario.create({
    data: {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senhaHash: senha,
    },
    select: { id: true, nome: true, email: true, criadoEm: true },
  });

  res.status(201).json(novo);
}