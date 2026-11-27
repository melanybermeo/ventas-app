const app = require('./app');

const PORT = process.env.PORT || 3000; // Render asigna PORT automáticamente

app.listen(PORT, () => {
  console.log(`Sistema de ventas escuchando en http://localhost:${PORT}`);
});
