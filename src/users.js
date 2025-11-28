// Módulo simple de almacenamiento de usuarios en memoria
// Nota: En un entorno real se usaría una base de datos.

const bcrypt = require('bcrypt');

// Estructura en memoria: { username: string, passwordHash: string }
const usuarios = new Map();

// Registra un usuario nuevo si no existe previamente
async function registrarUsuario(username, password) {
  // Validaciones básicas
  if (!username || !password) {
    throw new Error('Usuario y contraseña son requeridos');
  }

  if (usuarios.has(username)) {
    throw new Error('El usuario ya existe');
  }

  // Hash de contraseña (cost 10)
  const passwordHash = await bcrypt.hash(password, 10);

  // Persistencia en memoria
  usuarios.set(username, { username, passwordHash });

  return { username };
}

// Verifica credenciales de inicio de sesión
async function autenticarUsuario(username, password) {
  if (!username || !password) {
    throw new Error('Usuario y contraseña son requeridos');
  }

  const registro = usuarios.get(username);
  if (!registro) {
    return false; // Usuario no encontrado
  }

  // Comparación segura usando bcrypt
  const coincide = await bcrypt.compare(password, registro.passwordHash);
  return coincide;
}

module.exports = {
  registrarUsuario,
  autenticarUsuario,
};

