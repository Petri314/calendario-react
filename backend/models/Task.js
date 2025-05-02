const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  worker: { type: String, required: true },
  day: { type: String, required: true },
  task: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  aisle: { type: String, required: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
