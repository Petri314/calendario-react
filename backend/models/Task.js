const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  worker: String,
  startTime: String,
  endTime: String,
  aisle: String,
  category: String,
  camera: String,
  // Puedes eliminar los campos que ya no estás utilizando si lo deseas
});

module.exports = mongoose.model('Task', TaskSchema);