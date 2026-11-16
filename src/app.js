// app.js: monta a aplicação Express (middlewares e rotas).
import express from 'express';
import categoriasRoutes from './routes/categoriasRoutes.js';
import servicosRoutes from './routes/servicosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

const app = express();

// Permite receber JSON no corpo das requisições (req.body)
app.use(express.json());

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'ok', horario: new Date().toISOString() });
});

// Rota raiz: apresenta a API BurberHub
app.get('/', (req, res) => {
  res.json({
    nome: 'BurberHub',
    versao: '0.2.0',
    rotas: [
      'GET /api/servicos',
      'GET /api/servicos/:id',
      'POST /api/servicos',
      'PUT /api/servicos/:id',
      'DELETE /api/servicos/:id',
      'GET /api/categorias',
      'GET /api/categorias/:id',
      'GET /api/usuarios',
      'GET /api/usuarios/:id',
    ],
  });
});

// Liga as rotas de cada recurso
app.use('/api/categorias', categoriasRoutes);
app.use('/api/servicos', servicosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Qualquer rota que não existe: 404 em JSON
app.use((req, res) => {
  res.status(404).json({ erro: `Rota ${req.method} ${req.path} não existe` });
});

// Tratamento de erros: JSON mal escrito ou falha inesperada (sempre por último)
app.use((erro, req, res, next) => {
  if (erro.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido no corpo da requisição' });
  }
  console.error(erro);
  res.status(500).json({ erro: 'Erro interno no servidor' });
});

export default app;