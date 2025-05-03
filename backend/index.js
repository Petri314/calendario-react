const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

const Task = require('./models/Task');

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/calendario', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('🟢 Conectado a MongoDB'))
.catch(err => console.error('🔴 Error en MongoDB:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// Obtener lista de tareas desde MongoDB
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({}); // Consulta todos los documentos de la colección Task
    console.log('Backend: Tareas obtenidas de MongoDB:', tasks);
    res.json(tasks); // Devuelve las tareas obtenidas de la base de datos
  } catch (error) {
    console.error('🔴 Error al obtener las tareas de MongoDB:', error);
    res.status(500).send('Error al obtener tareas desde la base de datos');
  }
});

app.post('/api/tasks', async (req, res) => {
  const newTask = req.body;

  try {
    const task = await Task.create(newTask);
    res.status(201).json(task);
  } catch (error) {
    console.error('🔴 Error al guardar la tarea en MongoDB:', error);
    res.status(500).json({ message: 'Error al guardar la tarea' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});