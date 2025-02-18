const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco:', err.message);
  } else {
    console.log('✅ Banco de dados conectado');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS historico (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      data TEXT NOT NULL
    )
  `);
});

module.exports = db;
