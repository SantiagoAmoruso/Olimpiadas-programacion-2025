const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { destinatario, asunto, mensaje, tipo_destino } = req.body;
  if (!destinatario || !tipo_destino) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  db.query('INSERT INTO correos_enviados (destinatario, asunto, mensaje, tipo_destino) VALUES (?, ?, ?, ?)',
    [destinatario, asunto, mensaje, tipo_destino],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM correos_enviados', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM correos_enviados WHERE id_correo = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ error: 'Correo no encontrado' });
    res.json(results[0]);
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM correos_enviados WHERE id_correo = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Correo eliminado' });
  });
});

module.exports = router;
