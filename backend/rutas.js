
app.use('/clientes', require('./routes/clientes'));
app.use('/productos', require('./routes/productos'));
app.use('/pedidos', require('./routes/pedidos'));
app.use('/detalle-pedido', require('./routes/detallePedido'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/correos', require('./routes/correos'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
});
