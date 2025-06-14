
app.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;
    const db = require('./db');
    db.query('SELECT * FROM usuariosinternos WHERE usuario = ?', [usuario], (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0 || results[0].contraseña !== contraseña) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      const user = results[0];
      const token = jwt.sign({ id: user.id_usuario, rol: user.rol }, 'secreto123', { expiresIn: '1h' });
      res.json({ token });
    });
  });
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
  });
  