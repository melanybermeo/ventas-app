const request = require('supertest');
const app = require('../src/app');
const { calcularTotales, IVA } = require('../src/services/ventasService');

describe('Pruebas automatizadas del Sistema de Ventas (ventas-app)', () => {

  test('1. GET /api/health debe responder con estado ok y versión', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.estado).toBe('ok');
  });

  test('2. POST /api/auth/login debe autenticar con credenciales válidas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ usuario: 'admin', clave: 'admin123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toMatch(/exitoso/i);
    expect(res.body.usuario.usuario).toBe('admin');
  });

  test('3. POST /api/auth/login debe rechazar credenciales incorrectas con 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ usuario: 'admin', clave: 'clave_erronea' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('4. GET /api/productos debe devolver la lista de productos disponibles', async () => {
    const res = await request(app).get('/api/productos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(4);
  });

  test('5. POST /api/productos debe crear un producto nuevo correctamente', async () => {
    const nuevoProducto = { nombre: 'Audífonos Gamer', precio: 45.0, stock: 12 };
    const res = await request(app)
      .post('/api/productos')
      .send(nuevoProducto);

    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe('Audífonos Gamer');
    expect(res.body.precio).toBe(45.0);
  });

  test('6. POST /api/clientes debe rechazar datos vacíos con código 400', async () => {
    const res = await request(app)
      .post('/api/clientes')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errores');
  });

  test('7. GET /api/ventas debe listar las ventas registradas', async () => {
    const res = await request(app).get('/api/ventas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('8. calcularTotales debe calcular correctamente subtotal, IVA y total', () => {
    // calcularTotales usa los campos "precio" y "cantidad" de cada item.
    const detalle = [
      { productoId: 2, nombre: 'Mouse', precio: 15.5, cantidad: 2 }
    ];
    const resultado = calcularTotales(detalle);

    expect(resultado.subtotal).toBeCloseTo(31.0, 2);
    expect(resultado.iva).toBeCloseTo(31.0 * IVA, 2);
    expect(resultado.total).toBeCloseTo(31.0 * (1 + IVA), 2);
  });

});
