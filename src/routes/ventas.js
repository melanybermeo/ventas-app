const router = require('express').Router();
const ventasService = require('../services/ventasService');

router.get('/', (req, res) => res.json(ventasService.listar()));

router.post('/', (req, res) => {
  const resultado = ventasService.registrar(req.body || {});
  if (resultado.errores) return res.status(400).json({ errores: resultado.errores });
  res.status(201).json(resultado.venta);
});

module.exports = router;
