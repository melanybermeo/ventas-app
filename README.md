# Sistema de Ventas

Proyecto del **Componente Práctico 2** de *Gestión de la Configuración de Software* (UNEMI, Carrera de Software).
Implementa un flujo de integración y despliegue continuo con gestión de la variabilidad sobre un sistema de ventas sencillo.

## Integrantes

| Integrante | Responsabilidad | Rama |
|---|---|---|
| Melanie Bermeo | Repositorio, versionado y coordinación | `main`, `develop` |
| Jesús Sánchez | Pruebas automatizadas | `feature/pruebas` |
| Anthony Hernández | Integración y despliegue continuo (CI/CD) | `feature/ci-cd` |
| José Farías | Variabilidad y reutilización | `feature/variantes` |

## Funcionalidades (versión base)

- Inicio de sesión
- Productos (listar, consultar, crear)
- Clientes (listar, consultar, crear)
- Ventas (registrar con subtotal, IVA 15 % y total; descuenta stock)

## Cómo ejecutarlo

Requisito: Node.js 18 o superior.

```bash
npm install
npm start
```

Abrir http://localhost:3000. Usuario de prueba: `admin` / `admin123`.

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Estado y versión del sistema |
| POST | `/api/auth/login` | Inicio de sesión `{ usuario, clave }` |
| GET / POST | `/api/productos` | Listar / crear `{ nombre, precio, stock }` |
| GET | `/api/productos/:id` | Consultar un producto |
| GET / POST | `/api/clientes` | Listar / crear `{ nombre, cedula, email }` |
| GET | `/api/clientes/:id` | Consultar un cliente |
| GET / POST | `/api/ventas` | Listar / registrar `{ clienteId, items: [{ productoId, cantidad }] }` |

## Estructura

```
src/
  app.js            # Configuración de Express (se exporta para las pruebas)
  server.js         # Arranque del servidor
  data/store.js     # Datos en memoria
  routes/           # Rutas de la API
  services/         # Lógica de negocio (aquí se enfocan las pruebas)
public/index.html   # Interfaz web (login, panel, productos, clientes, ventas)
```

## Flujo de trabajo con Git

- `main`: versión estable; solo recibe cambios desde `develop` mediante Pull Request.
- `develop`: integración de las funcionalidades.
- `feature/<tarea>`: una rama por integrante, creada desde `develop`.

Cada integrante:

```bash
git clone <link-del-repo>
cd ventas-app
git checkout develop
git checkout -b feature/<tarea>
# ...cambios...
git add .
git commit -m "feat: descripción corta"
git push -u origin feature/<tarea>
```

Luego abre un Pull Request de su rama hacia `develop`. Antes de seguir trabajando: `git pull origin develop`.

### Convención de commits

`feat:` nueva funcionalidad · `fix:` corrección · `test:` pruebas · `ci:` pipeline · `docs:` documentación · `refactor:` reorganización de código.

## Versiones

Se usa versionado semántico (`MAYOR.MENOR.PARCHE`). Los cambios se registran en [CHANGELOG.md](CHANGELOG.md).

- `v1.0.0`: sistema base estable.
- `v1.1.0`: variantes Básica y Premium con CI/CD.
