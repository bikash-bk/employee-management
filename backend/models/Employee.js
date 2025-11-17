const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email required'], unique: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
