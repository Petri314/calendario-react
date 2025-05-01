const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

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

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});

// Obtener lista de tareas
app.get('/tasks', async (req, res) => {
    try {
      // Aquí podrías consultar una base de datos, pero por ahora enviamos datos de ejemplo
      const tasks = [
        { id: 1, name: 'Tarea 1', description: 'Descripción de la tarea 1' },
        { id: 2, name: 'Tarea 2', description: 'Descripción de la tarea 2' },
        { id: 3, name: 'Tarea 3', description: 'Descripción de la tarea 3' },
      ];
      res.json(tasks); // Devuelve las tareas al frontend
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener tareas');
    }
  });
  
  app.post('/tasks', (req, res) => {
    const newTask = req.body;
  
    // Guardar la tarea en la base de datos
    Task.create(newTask, (err, task) => {
      if (err) {
        return res.status(500).json({ message: 'Error al guardar la tarea' });
      }
      res.status(201).json(task);
    });
  });
  