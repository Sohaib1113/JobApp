const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Initialize Sequelize for MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');

    // Sync models with the database
    return sequelize.sync({ alter: true });  // This will drop and recreate tables
  })
  .then(() => {
    console.log('Database tables created!');
  })
  .catch(err => {
    console.error('Unable to connect to the database or sync tables:', err);
  });

// Import and use auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Import and use job routes
const jobRoutes = require('./routes/jobs');
app.use('/api/jobs', jobRoutes);

// Import and use applications routes
const applicationRoutes = require('./routes/applications');
app.use('/api/applications', applicationRoutes);

// Export the app for Vercel
module.exports = app;
