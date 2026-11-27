const { clientes } = require('../data/store');

function listar() {
  return clientes;
}

function obtener(id) {
  return clientes.find((c) => c.id === Number(id)) || null;
}

function validar({ nombre, cedula, email }) {
  const errores = [];
  if (!nombre || !String(nombre).trim()) errores.push('El nombre es obligatorio');
  if (!/^\d{10}$/.test(String(cedula || ''))) errores.push('La cédula debe tener 10 dígitos');
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errores.push('El email no es válido');
  return errores;
}

function crear(datos) {
  const errores = validar(datos);
  if (errores.length) return { errores };
  if (clientes.some((c) => c.cedula === String(datos.cedula))) {
    return { errores: ['Ya existe un cliente con esa cédula'] };
  }
  const nuevo = {
    id: clientes.length ? Math.max(...clientes.map((c) => c.id)) + 1 : 1,
    nombre: String(datos.nombre).trim(),
    cedula: String(datos.cedula),
    email: datos.email || ''
  };
  clientes.push(nuevo);
  return { cliente: nuevo };
}

module.exports = { listar, obtener, crear, validar };
