import { ErroApi } from '../erros.js';

const STATUS_VALIDOS = ['ativo', 'inativo'];

export function validarServico(dados, parcial = false) {
  const erros = [];
  if (!parcial || dados.nome !== undefined) {
    if (typeof dados.nome !== 'string' || dados.nome.trim() === '') erros.push('nome é obrigatório e precisa ser um texto');
  }
  if (dados.duracaoMin !== undefined) {
    if (!Number.isInteger(dados.duracaoMin) || dados.duracaoMin <= 0) erros.push('duracaoMin precisa ser um número inteiro maior que zero');
  }
  if (dados.preco !== undefined) {
    if (typeof dados.preco !== 'number' || !Number.isFinite(dados.preco) || dados.preco < 0) erros.push('preco precisa ser um número (zero ou mais)');
  }
  if (dados.status !== undefined) {
    if (!STATUS_VALIDOS.includes(dados.status)) erros.push(`status precisa ser: ${STATUS_VALIDOS.join(', ')}`);
  }
  if (!parcial || dados.categoriaId !== undefined) {
    if (!Number.isInteger(dados.categoriaId) || dados.categoriaId <= 0) erros.push('categoriaId é obrigatório e precisa ser um número inteiro');
  }
  if (erros.length > 0) {
    throw new ErroApi(400, 'Dados inválidos', erros);
  }
}

export function lerId(texto) {
  const id = Number(texto);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ErroApi(400, 'O id precisa ser um número inteiro positivo');
  }
  return id;
}