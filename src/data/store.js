// Datos en memoria (no se usa base de datos para mantener el sistema sencillo).
// Al reiniciar el servidor, los datos vuelven a este estado inicial.

const usuarios = [
  { id: 1, usuario: 'admin', clave: 'admin123', nombre: 'Administrador' },
  { id: 2, usuario: 'vendedor', clave: 'venta123', nombre: 'Vendedor' }
];

const productos = [
  { id: 1, nombre: 'Laptop', precio: 750.0, stock: 10 },
  { id: 2, nombre: 'Mouse', precio: 15.5, stock: 50 },
  { id: 3, nombre: 'Teclado', precio: 25.0, stock: 30 },
  { id: 4, nombre: 'Monitor', precio: 180.0, stock: 8 }
];

const clientes = [
  { id: 1, nombre: 'María López', cedula: '0912345678', email: 'maria@correo.com' },
  { id: 2, nombre: 'Carlos Pérez', cedula: '0923456789', email: 'carlos@correo.com' }
];

const ventas = [];

module.exports = { usuarios, productos, clientes, ventas };
