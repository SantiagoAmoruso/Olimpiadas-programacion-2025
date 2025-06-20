const express = require('express');
const router = express.Router();
const db = require('../db');
const { soloJefeVentas } = require('../index');

router.post('/', soloJefeVentas, (req, res) => {
  const { usuario, contraseña, rol, email } = req.body;
  if (!usuario || !contraseña || !rol) {
    return res.status(400).json({ error: 'Datos obligatorios faltantes' });
  }
  db.query('INSERT INTO usuariosinternos (usuario, contraseña, rol, email) VALUES (?, ?, ?, ?)',
    [usuario, contraseña, rol, email],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM usuariosinternos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.put('/:id', soloJefeVentas, (req, res) => {
  const { contraseña, rol, email } = req.body;
  db.query('UPDATE usuariosinternos SET contraseña = ?, rol = ?, email = ? WHERE id_usuario = ?',
    [contraseña, rol, email, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Usuario actualizado' });
    });
});

router.delete('/:id', soloJefeVentas, (req, res) => {
  db.query('DELETE FROM usuariosinternos WHERE id_usuario = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuario eliminado' });
  });
});

module.exports = router;
