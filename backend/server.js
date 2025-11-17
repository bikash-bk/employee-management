require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// Connect
connectDB(process.env.MONGO_URI);

// Routes
app.use('/api/employees', employeeRoutes);

// Health check
app.get('/', (req, res) => res.send('EMS Backend is running'));

// Error handler must be after routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
