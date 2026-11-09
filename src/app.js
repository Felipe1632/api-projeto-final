// app.js: monta a aplicação Express (rotas, middlewares).
// Quem liga o servidor é o server.js. Separar os dois facilita testes e o deploy.
import express from 'express';

const app = express();

// Permite receber JSON no corpo das requisições (usaremos no próximo encontro)
app.use(express.json());

// Rota de saúde: usada por serviços de nuvem para saber se a API está viva
app.get('/health', (req, res) => {
  res.json({ status: 'ok', horario: new Date().toISOString() });
});

// Rota raiz: apresenta a API
app.get('/', (req, res) => {
  res.json({
    nome: 'BurberHub',
    versao: '0.1.0',
    rotas: ['GET /health'],
  });
});

// Dados em memória (no encontro 4 vão para o PostgreSQL)
// const chamados = [
//   { id: 1, titulo: 'Monitor piscando', prioridade: 'media', status: 'aberto' },
//   { id: 2, titulo: 'Sem internet na doca 3', prioridade: 'alta', status: 'em_andamento' },
//   { id: 3, titulo: 'Senha do ERP bloqueada', prioridade: 'alta', status: 'resolvido' },
// ];

// // Lista
// app.get('/api/chamados', (req, res) => {
//   res.json(chamados);
// });

//Usuarios
const usuarios = [
  {
    id: 1,
    nome: "Felipe Souza",
    email: "felipe.souza@barbearia.com",
    senhaHash: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vj.sRpO90y",
    criadoEm: new Date("2026-11-09T10:30:00Z")
  },
  {
    id: 2,
    nome: "Gabriel 'Bifão' Alves",
    email: "gabriel.barbeiro@barbearia.com",
    senhaHash: "$2b$10$76dA3fH9X.w8Kz9pL0M1NuQ2RvSwTxUyVzA1B2C3D4E5F6G7H8I9J",
    criadoEm: new Date("2026-11-09T11:15:00Z")
  },
  {
    id: 3,
    nome: "Lucas 'Navalha' Rocha",
    email: "lucas.barbeiro@barbearia.com",
    senhaHash: "$2b$10$91eB4gI0Y.x9La0qM1N2OvRwSxTyUzWzA2B3C4D5E6F7G8H9I0K",
    criadoEm: new Date("2026-11-09T12:00:00Z")
  },
  {
    id: 4,
    nome: "Matheus Henrique",
    email: "matheus.cliente@email.com",
    senhaHash: "$2b$10$82fC5hJ1Z.y0Mb1rN2O3PwSxTyUzWzA3B4C5D6E7F8G9H0I1L",
    criadoEm: new Date("2026-11-09T14:20:00Z")
  },
  {
    id: 5,
    nome: "Rafael Costa",
    email: "rafael.cliente@email.com",
    senhaHash: "$2b$10$63gD6iK2A.z1Nc2sO3P4QxTyUzWzA4B5C6D7E8F9G0H1I2M",
    criadoEm: new Date("2026-11-09T15:45:00Z")
  }
];
app.get('/api/usuarios',(req, res) => {
  res.json(usuarios);
})

// Detalhe: :id é um parâmetro, chega em req.params.id (como TEXTO)
app.get('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID deve ser um número válido' });
  }

  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  return res.json(usuario);
});

//Categorias
const categorias = [
  {
    id: 1,
    nome: "Cabelo"
  },
  {
    id: 2,
    nome: "Barba"
  },
  {
    id: 3,
    nome: "Acabamento & Pezinho"
  },
  {
    id: 4,
    nome: "Tratamentos Capilares"
  },
  {
    id: 5,
    nome: "Combos"
  }
];

app.get('/api/categorias',(req, res) => {
  res.json(categorias);
})

//Serviços
const servicos = [
  { id: 1, nome: 'Corte masculino', duracaoMin: 30, preco: 40.0, status: 'ativo' },
  { id: 2, nome: 'Barba completa', duracaoMin: 20, preco: 30.0, status: 'ativo' },
  { id: 3, nome: 'Corte + barba', duracaoMin: 50, preco: 65.0, status: 'ativo' },
  { id: 4, nome: 'Pigmentação', duracaoMin: 40, preco: 50.0, status: 'inativo' },
];

app.get('/api/servicos',(req, res) => {
  res.json(servicos);
})
export default app;