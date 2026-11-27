// La app se exporta sin llamar a listen() para poder probarla con Jest + Supertest.
const path = require('path');
const express = require('express');
const { version } = require('../package.json');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => res.json({ estado: 'ok', version }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/ventas', require('./routes/ventas'));

app.use('/api', (req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

module.exports = app;
