const express = require('express');
const app = express();

// Middleware para que el servidor entienda JSON
app.use(express.json());

// Aquí agregaremos nuestras rutas...
const tareas = [
  { id: 1, titulo: 'Configurar proyecto Node', completada: true },
  { id: 2, titulo: 'Crear ruta GET', completada: false }
]

app.get('/api/tareas', (req, res) => {
  res.json(tareas)
})

app.get('/api/tareas/:id', (req, res) => {
  const id = Number(req.params.id)
  const tarea = tareas.find((tarea) => tarea.id === id);
  if (!tarea) {
    return res.status(404).json({ mensaje: 'No encontrado' })
  }
  res.json(tarea)
})
app.post('/api/tareas/', (req, res) => {
  const titulo = req.body.titulo
  if (!titulo) {
    return res.status(400).json({ mensaje: 'El titulo de la tarea no puede venir vacio' })
  }
  const nuevaTarea = {
    id: tareas.length + 1,
    titulo: titulo,
    completada: false
  }

  tareas.push(nuevaTarea)
  res.status(201).json(nuevaTarea)

})
app.put('/api/tareas/:id', (req, res) => {
  const id = Number(req.params.id)
  const tarea = tareas.find((tarea) => tarea.id === id)
  if (!tarea) {
    return res.status(404).json({ mensaje: 'No encontrado' })
  }
  tarea.titulo = req.body.titulo ?? tarea.titulo
  tarea.completada = req.body.completada ?? tarea.completada
  res.json(tarea)

})

app.delete('/api/tareas/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = tareas.findIndex((tarea) => tarea.id === id)
  if (index === -1) {
    return res.status(404).json({ mensaje: 'Error' })
  }
  tareas.splice(index, 1)
  res.status(204).send()
})
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});