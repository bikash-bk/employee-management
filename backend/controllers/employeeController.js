const Employee = require('../models/Employee');

// Create
exports.createEmployee = async (req, res, next) => {
  try {
    const { name, email, department, salary } = req.body;
    const employee = await Employee.create({ name, email, department, salary });
    res.status(201).json(employee);
  } catch (err) {
    // Pass errors to centralized error handler
    next(err);
  }
};

// Get all
exports.getEmployees = async (req, res, next) => {
  try {
    // simple pagination support via query params
    const { page = 1, limit = 0, search } = req.query;
    const filter = search ? {
      $or: [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { department: new RegExp(search, 'i') }
      ]
    } : {};

    const skip = (page - 1) * (limit ? parseInt(limit) : 0);

    const query = Employee.find(filter);
    if (limit) query.skip(skip).limit(parseInt(limit));

    const employees = await query.exec();
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

// Get one
exports.getEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    next(err);
  }
};

// Update
exports.updateEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    next(err);
  }
};

// Delete
exports.deleteEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    next(err);
  }
};
