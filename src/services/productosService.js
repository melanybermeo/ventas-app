const { productos } = require('../data/store');

function listar() {
  return productos;
}

function obtener(id) {
  return productos.find((p) => p.id === Number(id)) || null;
}

function validar({ nombre, precio, stock }) {
  const errores = [];
  if (!nombre || typeof nombre !== 'string' || !nombre.trim()) errores.push('El nombre es obligatorio');
  if (typeof precio !== 'number' || precio <= 0) errores.push('El precio debe ser un número mayor a 0');
  if (!Number.isInteger(stock) || stock < 0) errores.push('El stock debe ser un entero mayor o igual a 0');
  return errores;
}

function crear(datos) {
  const errores = validar(datos);
  if (errores.length) return { errores };
  const nuevo = {
    id: productos.length ? Math.max(...productos.map((p) => p.id)) + 1 : 1,
    nombre: datos.nombre.trim(),
    precio: datos.precio,
    stock: datos.stock
  };
  productos.push(nuevo);
  return { producto: nuevo };
}

module.exports = { listar, obtener, crear, validar };
