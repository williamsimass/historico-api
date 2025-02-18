const express = require('express');
const db = require('./database');

const router = express.Router();

// Listar relatórios
router.get('/historico', (req, res) => {
  db.all('SELECT * FROM historico ORDER BY data DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Adicionar um novo relatório
router.post('/historico', (req, res) => {
  const { titulo, data } = req.body;
  if (!titulo || !data) {
    return res.status(400).json({ error: 'Título e data são obrigatórios' });
  }

  db.run('INSERT INTO historico (titulo, data) VALUES (?, ?)', [titulo, data], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, titulo, data });
  });
});

module.exports = router;
