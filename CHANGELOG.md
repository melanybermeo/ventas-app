# Registro de cambios (CHANGELOG)

Todos los cambios importantes del proyecto se registran en este archivo.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

## [Sin publicar]

- Workflow de CI/CD con GitHub Actions: pruebas, build, artefacto descargable y despliegue automático en Render (Básica y Premium).

### Agregado
- (Cada integrante agrega aquí lo que integra en develop.)

## [1.0.0] - AAAA-MM-DD

### Agregado
- Sistema base de ventas en Node.js/Express.
- Inicio de sesión de usuarios.
- Gestión de productos (listar, consultar, crear con validaciones).
- Gestión de clientes (listar, consultar, crear con validación de cédula).
- Registro de ventas con cálculo de subtotal, IVA (15 %) y total, y control de stock.
- Interfaz web (`public/index.html`): inicio de sesión, panel con resumen, productos, clientes y carrito de venta.
- Endpoint `/api/health` que muestra la versión del sistema.
