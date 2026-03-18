const express = require("express");
const Database = require("better-sqlite3");
const path = require('path');

const app = express();

app.use(express.json());

const db = new Database("app.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS nachrichten (
    id INTEGER PRIMARY KEY,
    empfaenger TEXT,
    text TEXT,
    zeitpunkt TEXT
  )
`).run();

// Alle Nachrichten anzeigen.

app.get("/nachrichten", (req, res) => {
  const tasks = db.prepare(`
    SELECT * FROM nachrichten
  `).all();

  res.json(tasks);
});

// Pendente Aufgaben anzeigen.

app.get("/nachrichten/pendent", (req, res) => {
  const jetzt = new Date();

  const jetzt_lokal = new Date(jetzt.getTime() - jetzt.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0,16);

  const nachrichten = db.prepare(`
    SELECT * FROM nachrichten WHERE zeitpunkt <= ?
  `).all(jetzt_lokal);

  res.json(nachrichten);
});

// Eine Nachricht erstellen.

app.post("/nachrichten", (req, res) => {
  const { empfaenger, text, zeitpunkt } = req.body;

  db.prepare(`
    INSERT INTO nachrichten(empfaenger, text, zeitpunkt)
    VALUES (?, ?, ?)
  `).run(empfaenger, text, zeitpunkt);

  res.json({ status: "OK" });
});

// Eine Nachricht löschen.

app.delete("/nachrichten/:id", (req, res) => {
  db.prepare(`
    DELETE FROM nachrichten
    WHERE id = ?
  `).run(req.params.id);

  res.json({ status: "OK" });
});

// Testseite anzeigen.

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "test.html"));
});

app.listen(8081);
