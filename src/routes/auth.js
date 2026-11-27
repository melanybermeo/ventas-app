const router = require('express').Router();
const authService = require('../services/authService');

router.post('/login', (req, res) => {
  const { usuario, clave } = req.body || {};
  const usuarioValido = authService.login(usuario, clave);
  if (!usuarioValido) return res.status(401).json({ error: 'Usuario o clave incorrectos' });
  res.json({ mensaje: 'Inicio de sesión exitoso', usuario: usuarioValido });
});

module.exports = router;
