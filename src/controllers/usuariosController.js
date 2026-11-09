// Controller: as regras de cada operação do recurso "usuarios".
import { usuarios } from '../data/usuarios.js';

// GET /api/usuarios
export function listarUsuarios (req, res) {
  res.json(usuarios);
}

// GET /api/usuarios/:id
export function buscarPorId (req, res) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID deve ser um número válido' });
  }

  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  return res.json(usuario);
};