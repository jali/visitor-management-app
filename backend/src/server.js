const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const CLIENT_BASE_URL = require('./constants');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({ 
    origin: CLIENT_BASE_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/visit', require('./routes/visit'));

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
