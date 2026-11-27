const router = require('express').Router();
const service = require('../services/clientesService');

router.get('/', (req, res) => res.json(service.listar()));

router.get('/:id', (req, res) => {
  const item = service.obtener(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  res.json(item);
});

router.post('/', (req, res) => {
  const resultado = service.crear(req.body || {});
  if (resultado.errores) return res.status(400).json({ errores: resultado.errores });
  res.status(201).json(resultado.cliente);
});

module.exports = router;
