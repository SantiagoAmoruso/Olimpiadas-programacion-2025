
const express = require('express');
const router = express.Router();
const db = require('../db');

function validarCliente(req, res, next) {
  const { nombre, apellido, email, contraseña } = req.body;
  if (!nombre || !apellido || !email || !contraseña) {
    return res.status(400).json({ error: 'Faltan datos obligatorios.' });
  }
  next();
}

router.post('/', validarCliente, (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;
  db.query('INSERT INTO clientes (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)',
    [nombre, apellido, email, contraseña],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM clientes WHERE id_cliente = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(results[0]);
  });
});

router.put('/:id', (req, res) => {
  const { nombre, apellido, email } = req.body;
  if (!nombre || !apellido || !email) {
    return res.status(400).json({ error: 'Faltan datos para actualizar.' });
  }
  db.query('UPDATE clientes SET nombre = ?, apellido = ?, email = ? WHERE id_cliente = ?',
    [nombre, apellido, email, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
      res.json({ message: 'Cliente actualizado' });
    });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM clientes WHERE id_cliente = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json({ message: 'Cliente eliminado' });
  });
});

module.exports = router;