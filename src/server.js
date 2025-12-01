// Servidor HTTP con Express para registro e inicio de sesión
// Endpoints:
//  - POST /api/register { username, password }
//  - POST /api/login    { username, password }
// Respuestas:
//  - Éxito: { message: "Autenticación satisfactoria" } en /api/login
//  - Error: { error: "mensaje" } con códigos HTTP apropiados

const express = require('express');
const { registrarUsuario, autenticarUsuario } = require('./users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON del cuerpo de la petición
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.text({ type: 'text/plain' }));

// Permite que cuerpos enviados como text/plain conteniendo JSON sean parseados
app.use((req, res, next) => {
  if (req.is('text/plain') && typeof req.body === 'string') {
    try {
      req.body = JSON.parse(req.body);
    } catch (_) {
      // Si no es JSON válido, se deja tal cual y las rutas validarán
    }
  }
  next();
});

// Endpoint de salud para pruebas rápidas
app.get('/', (req, res) => {
  res.json({ status: 'API activa' });
});

// Registro de usuario nuevo
app.post('/api/register', async (req, res) => {
  try {
    const body = req.body || {};
    const { username, password } = body;
    const usuario = await registrarUsuario(username, password);
    // Se retorna un mensaje de confirmación de registro
    res.status(201).json({ message: 'Registro exitoso', user: usuario.username });
  } catch (err) {
    // En caso de error de validación/conflicto, se retorna 400
    const msg = typeof err?.message === 'string' ? err.message : 'Solicitud inválida';
    res.status(400).json({ error: msg });
  }
});

// Inicio de sesión
app.post('/api/login', async (req, res) => {
  try {
    const body = req.body || {};
    const { username, password } = body;
    const autenticado = await autenticarUsuario(username, password);

    if (!autenticado) {
      // Credenciales inválidas
      return res.status(401).json({ error: 'Error en la autenticación' });
    }

    // Autenticación correcta: se responde con mensaje de éxito
    res.json({ message: 'Autenticación satisfactoria' });
  } catch (err) {
    // Errores de validación/entrada
    const msg = typeof err?.message === 'string' ? err.message : 'Solicitud inválida';
    res.status(400).json({ error: msg });
  }
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
