// Importamos el módulo de Express
const express = require('express');

// Creamos una aplicación de Express
const app = express();

// Definimos el puerto en el que correrá el servidor
const port = 3000;

// Middleware que permite recibir y procesar JSON en las solicitudes
app.use(express.json());

// Simulamos una base de datos en memoria para almacenar usuarios registrados
const users = [];

/**
 * Endpoint para registrar un nuevo usuario
 * Método: POST
 * Ruta: /register
 * Se requiere un cuerpo con 'username' y 'password'
 */
app.post('/registro', (req, res) => {
  const { username, password } = req.body;

  // Validamos que ambos campos estén presentes
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
  }

  // Verificamos si el usuario ya está registrado
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'Usuario ya está registrado.' });
  }

  // Agregamos el nuevo usuario a la base de datos simulada
  users.push({ username, password });

  // Respondemos con un mensaje de éxito
  return res.status(201).json({ message: 'Usuario registrado correctamente.' });
});

/**
 * Endpoint para iniciar sesión
 * Método: POST
 * Ruta: /login
 * Se requiere un cuerpo con 'username' y 'password'
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validamos que ambos campos estén presentes
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
  }

  // Buscamos el usuario en nuestra base de datos simulada
  const user = users.find(user => user.username === username && user.password === password);

  // Verificamos si el usuario fue encontrado y si las credenciales son correctas
  if (user) {
    return res.status(200).json({ message: 'Authenticacion exitosa.' });
  } else {
    // Si no se encuentra el usuario o las credenciales son incorrectas
    return res.status(401).json({ message: 'Authenticación fallida, usuario o contraseña son invalidos.' });
  }
});

/**
 * Inicia el servidor y escucha las solicitudes en el puerto definido
 */
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
