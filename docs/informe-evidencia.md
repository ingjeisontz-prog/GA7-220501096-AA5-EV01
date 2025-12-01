# Informe de evidencia: GA7-220501096-AA5-EV02

## Resumen
- API de registro e inicio de sesión en `Express`.
- Endpoints: `GET /`, `POST /api/register`, `POST /api/login`.
- Validaciones de entrada aplicadas y mensajes de respuesta consistentes.
- Colección Postman incluida: `postman/servicio-auth.postman_collection.json`.

## Pasos de prueba
- Instalar dependencias: `npm install`.
- Iniciar servidor: `npm start`.
- Probar salud: `GET http://localhost:3000/` debe responder `{"status":"API activa"}`.
- Registrar usuario: `POST http://localhost:3000/api/register` con body `{"username":"demo","password":"123456"}`.
- Login correcto: `POST http://localhost:3000/api/login` con las credenciales registradas.
- Login negativo: usar contraseña incorrecta, debe responder `401` con `{"error":"Error en la autenticación"}`.

## Pantallazos sugeridos
- Terminal con servidor mostrando `Servidor escuchando en http://localhost:3000`.
- Postman importando la colección y variables (`baseUrl`, `username`, `password`).
- Ejecución de `GET /` con tests en verde.
- Ejecución de `POST /api/register` mostrando `201` y cuerpo de respuesta.
- Ejecución de `POST /api/login` con `200`.
- Caso negativo de `POST /api/login` con `401`.

## Guion para video
- Presentación: objetivo de la evidencia y breve descripción de la API.
- Preparación: instalación de dependencias y arranque del servidor.
- Postman: importación de la colección y configuración de variables.
- Pruebas: ejecutar salud, registro, login y caso negativo mostrando resultados y tests.
- Cierre: conclusiones y cumplimiento de requisitos.

## Endpoints y ejemplos
- `GET /` → ejemplo: `curl http://localhost:3000/`
- `POST /api/register` → ejemplo: `curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d '{"username":"demo","password":"123456"}'`
- `POST /api/login` → ejemplo: `curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"username":"demo","password":"123456"}'`

