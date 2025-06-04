import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Config .env
dotenv.config();

// Emular __dirname (ES Modules não tem __dirname nativo)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializa Express
const app = express();
const PORT = process.env.APP_PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'loja_games'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rotas da API

// 1. GET - Listar todos os jogos
app.get('/api/games', (req, res) => {
  db.query('SELECT * FROM jogos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar jogos:', err);
      return res.status(500).json({ error: 'Erro ao buscar jogos' });
    }
    res.json(results);
  });
});

// 2. GET - Buscar jogo por ID
app.get('/api/games/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM games WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar jogo:', err);
      return res.status(500).json({ error: 'Erro ao buscar jogo' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    res.json(results[0]);
  });
});

// 3. POST - Adicionar novo jogo
app.post('/api/games', (req, res) => {
  const { nome, genero, classificacao, preco, quantidade, disponibilidade } = req.body;

  if (!nome || !preco || quantidade === undefined) {
    return res.status(400).json({ error: 'Dados incompletos. Nome, preço e quantidade são obrigatórios.' });
  }

  const game = { nome, genero, classificacao, preco, quantidade, disponibilidade: disponibilidade || 'Disponível' };

  db.query('INSERT INTO jogos SET ?', game, (err, result) => {
    if (err) {
      console.error('Erro ao adicionar jogo:', err);
      return res.status(500).json({ error: 'Erro ao adicionar jogo' });
    }
    res.status(201).json({ id: result.insertId, ...game });
  });
});

// 4. PUT - Atualizar jogo
app.put('/api/games/:id', (req, res) => {
  const id = req.params.id;
  const { nome, genero, classificacao, preco, quantidade, disponibilidade } = req.body;

  if (!nome || !preco || quantidade === undefined) {
    return res.status(400).json({ error: 'Dados incompletos. Nome, preço e quantidade são obrigatórios.' });
  }

  const game = { nome, genero, classificacao, preco, quantidade, disponibilidade: disponibilidade || 'Disponível' };

  db.query('UPDATE jogos SET ? WHERE id = ?', [game, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar jogo:', err);
      return res.status(500).json({ error: 'Erro ao atualizar jogo' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    res.json({ id: parseInt(id), ...game });
  });
});

// 5. DELETE - Excluir jogo
app.delete('/api/games/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM games WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir jogo:', err);
      return res.status(500).json({ error: 'Erro ao excluir jogo' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    res.json({ message: `Jogo com ID ${id} excluído com sucesso` });
  });
});

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.DB_NAME}`);
});
