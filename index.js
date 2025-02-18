// index.js (Backend)
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Armazenamento temporário dos relatórios (pode ser substituído por um banco de dados)
let historicoRelatorios = [];

// Rota para gerar relatório
app.post('/api/relatorio', (req, res) => {
  const novoRelatorio = {
    id: Date.now(),
    data: new Date().toLocaleString(),
    descricao: "Relatório gerado com sucesso."
  };

  // Adiciona o relatório ao histórico
  historicoRelatorios = [novoRelatorio, ...historicoRelatorios];
  res.status(201).json({ message: "Relatório gerado e salvo no histórico!", relatorio: novoRelatorio });
});

// Rota para pegar o histórico de relatórios
app.get('/api/historico', (req, res) => {
  res.status(200).json(historicoRelatorios);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
