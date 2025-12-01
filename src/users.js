// Módulo simple de almacenamiento de usuarios en memoria
// Nota: En un entorno real se usaría una base de datos.

const bcrypt = require('bcrypt');

// Estructura en memoria: { username: string, passwordHash: string }
const usuarios = new Map();

// Registra un usuario nuevo si no existe previamente
async function registrarUsuario(username, password) {
  if (typeof username !== 'string' || typeof password !== 'string') {
    throw new Error('Datos inválidos');
  }
  const u = username.trim();
  const p = password;
  if (!u || !p) {
    throw new Error('Usuario y contraseña son requeridos');
  }
  if (u.length < 3 || u.length > 30) {
    throw new Error('Usuario inválido');
  }
  if (!/^[a-zA-Z0-9_.-]+$/.test(u)) {
    throw new Error('Usuario inválido');
  }
  if (p.length < 6 || p.length > 64) {
    throw new Error('Contraseña inválida');
  }
  if (usuarios.has(u)) {
    throw new Error('El usuario ya existe');
  }

  const passwordHash = await bcrypt.hash(p, 10);
  usuarios.set(u, { username: u, passwordHash });
  return { username: u };
}

// Verifica credenciales de inicio de sesión
async function autenticarUsuario(username, password) {
  if (typeof username !== 'string' || typeof password !== 'string') {
    throw new Error('Datos inválidos');
  }
  const u = username.trim();
  const p = password;
  if (!u || !p) {
    throw new Error('Usuario y contraseña son requeridos');
  }
  const registro = usuarios.get(u);
  if (!registro) {
    return false;
  }
  const coincide = await bcrypt.compare(p, registro.passwordHash);
  return coincide;
}

module.exports = {
  registrarUsuario,
  autenticarUsuario,
};
