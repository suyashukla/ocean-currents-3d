const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ocean_currents',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Routes

// Get all ocean currents
app.get('/api/currents', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        name, 
        type, 
        description, 
        coordinates,
        created_at,
        updated_at
      FROM ocean_currents 
      ORDER BY name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching currents:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific ocean current by ID
app.get('/api/currents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM ocean_currents WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ocean current not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching current:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new ocean current
app.post('/api/currents', async (req, res) => {
  try {
    const { name, type, description, coordinates } = req.body;
    
    const result = await pool.query(
      `INSERT INTO ocean_currents (name, type, description, coordinates) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [name, type, description, JSON.stringify(coordinates)]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating current:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an ocean current
app.put('/api/currents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, description, coordinates } = req.body;
    
    const result = await pool.query(
      `UPDATE ocean_currents 
       SET name = $1, type = $2, description = $3, coordinates = $4, updated_at = NOW()
       WHERE id = $5 
       RETURNING *`,
      [name, type, description, JSON.stringify(coordinates), id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ocean current not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating current:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an ocean current
app.delete('/api/currents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM ocean_currents WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ocean current not found' });
    }
    
    res.json({ message: 'Ocean current deleted successfully' });
  } catch (err) {
    console.error('Error deleting current:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`API docs: http://localhost:${PORT}/api/currents`);
}); 