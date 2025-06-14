const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { id_pedido, id_producto, cantidad, subtotal } = req.body;
  if (!id_pedido || !id_producto || !cantidad || subtotal == null) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }
  db.query('INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)',
    [id_pedido, id_producto, cantidad, subtotal],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM detalle_pedido', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM detalle_pedido WHERE id_detalle = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ error: 'Detalle no encontrado' });
    res.json(results[0]);
  });
});

router.put('/:id', (req, res) => {
  const { cantidad, subtotal } = req.body;
  db.query('UPDATE detalle_pedido SET cantidad = ?, subtotal = ? WHERE id_detalle = ?',
    [cantidad, subtotal, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Detalle no encontrado' });
      res.json({ message: 'Detalle actualizado' });
    });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM detalle_pedido WHERE id_detalle = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Detalle no encontrado' });
    res.json({ message: 'Detalle eliminado' });
  });
});

module.exports = router;

