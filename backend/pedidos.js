const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { id_cliente, estado, total } = req.body;
  if (!id_cliente || !estado || total == null) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }
  db.query('INSERT INTO pedidos (id_cliente, estado, total) VALUES (?, ?, ?)',
    [id_cliente, estado, total],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM pedidos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM pedidos WHERE id_pedido = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(results[0]);
  });
});

router.put('/:id', (req, res) => {
  const { estado, total } = req.body;
  db.query('UPDATE pedidos SET estado = ?, total = ? WHERE id_pedido = ?',
    [estado, total, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Pedido no encontrado' });
      res.json({ message: 'Pedido actualizado' });
    });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM pedidos WHERE id_pedido = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json({ message: 'Pedido eliminado' });
  });
});

module.exports = router;