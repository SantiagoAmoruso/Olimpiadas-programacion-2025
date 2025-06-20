const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { codigo, descripcion, precio_unitario, tipo_producto } = req.body;
  if (!codigo || !descripcion || !precio_unitario || !tipo_producto) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }
  db.query('INSERT INTO productos (codigo, descripcion, precio_unitario, tipo_producto) VALUES (?, ?, ?, ?)',
    [codigo, descripcion, precio_unitario, tipo_producto],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM productos WHERE id_producto = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(results[0]);
  });
});

router.put('/:id', (req, res) => {
  const { descripcion, precio_unitario, tipo_producto } = req.body;
  db.query('UPDATE productos SET descripcion = ?, precio_unitario = ?, tipo_producto = ? WHERE id_producto = ?',
    [descripcion, precio_unitario, tipo_producto, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json({ message: 'Producto actualizado' });
    });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  });
});

module.exports = router;
