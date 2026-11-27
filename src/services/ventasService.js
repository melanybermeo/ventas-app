const { ventas, productos, clientes } = require('../data/store');

const IVA = 0.15; // IVA vigente en Ecuador

function redondear(valor) {
  return Math.round(valor * 100) / 100;
}

// Calcula subtotal, IVA y total a partir de items [{ precio, cantidad }].
function calcularTotales(items) {
  const subtotal = redondear(items.reduce((suma, i) => suma + i.precio * i.cantidad, 0));
  const iva = redondear(subtotal * IVA);
  const total = redondear(subtotal + iva);
  return { subtotal, iva, total };
}

// Registra una venta: valida cliente, productos y stock; descuenta el stock.
// items de entrada: [{ productoId, cantidad }]
function registrar({ clienteId, items }) {
  const cliente = clientes.find((c) => c.id === Number(clienteId));
  if (!cliente) return { errores: ['El cliente no existe'] };
  if (!Array.isArray(items) || items.length === 0) return { errores: ['La venta debe tener al menos un producto'] };

  const detalle = [];
  for (const item of items) {
    const producto = productos.find((p) => p.id === Number(item.productoId));
    const cantidad = Number(item.cantidad);
    if (!producto) return { errores: [`El producto ${item.productoId} no existe`] };
    if (!Number.isInteger(cantidad) || cantidad <= 0) return { errores: ['La cantidad debe ser un entero mayor a 0'] };
    if (producto.stock < cantidad) return { errores: [`Stock insuficiente para ${producto.nombre}`] };
    detalle.push({ productoId: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad });
  }

  // Solo se descuenta el stock cuando todos los items son válidos.
  detalle.forEach((d) => {
    productos.find((p) => p.id === d.productoId).stock -= d.cantidad;
  });

  const venta = {
    id: ventas.length + 1,
    fecha: new Date().toISOString(),
    cliente: { id: cliente.id, nombre: cliente.nombre },
    detalle,
    ...calcularTotales(detalle)
  };
  ventas.push(venta);
  return { venta };
}

function listar() {
  return ventas;
}

module.exports = { calcularTotales, registrar, listar, IVA };
