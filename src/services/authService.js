const { usuarios } = require('../data/store');

// Devuelve el usuario (sin la clave) si las credenciales son correctas, o null.
function login(usuario, clave) {
  if (!usuario || !clave) return null;
  const encontrado = usuarios.find((u) => u.usuario === usuario && u.clave === clave);
  if (!encontrado) return null;
  const { clave: _omitida, ...datos } = encontrado;
  return datos;
}

module.exports = { login };
