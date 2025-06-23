const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ocean_currents',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

const sampleCurrents = [
  {
    name: 'Gulf Stream',
    type: 'warm',
    description: 'A warm Atlantic ocean current originating in the Gulf of Mexico, flowing into the Atlantic at the tip of Florida. It transports warm water northward along the eastern coast of the United States.',
    coordinates: [
      [-80, 25], [-75, 30], [-70, 35], [-60, 40], [-50, 45], [-40, 50]
    ]
  },
  {
    name: 'Kuroshio Current',
    type: 'warm',
    description: 'A north-flowing ocean current on the west side of the North Pacific Ocean. It is similar to the Gulf Stream in the Atlantic Ocean.',
    coordinates: [
      [130, 25], [135, 30], [140, 35], [145, 40], [150, 45]
    ]
  },
  {
    name: 'California Current',
    type: 'cold',
    description: 'A cold Pacific Ocean current that moves southward along the western coast of North America, bringing cool water from the north.',
    coordinates: [
      [-130, 48], [-125, 40], [-120, 35], [-115, 30], [-110, 25]
    ]
  },
  {
    name: 'Canary Current',
    type: 'cold',
    description: 'A wind-driven surface current that is part of the North Atlantic subtropical gyre, flowing southward along the northwest coast of Africa.',
    coordinates: [
      [-20, 35], [-18, 30], [-16, 25], [-15, 20], [-14, 15]
    ]
  },
  {
    name: 'Brazil Current',
    type: 'warm',
    description: 'A warm current that flows southward along the Brazilian coast, transporting warm water from the tropics.',
    coordinates: [
      [-40, -5], [-45, -10], [-50, -15], [-55, -20], [-60, -25]
    ]
  },
  {
    name: 'Benguela Current',
    type: 'cold',
    description: 'A cold current flowing northward along the west coast of southern Africa, bringing cool water from the Antarctic.',
    coordinates: [
      [10, -35], [12, -30], [14, -25], [16, -20], [18, -15]
    ]
  },
  {
    name: 'East Australian Current',
    type: 'warm',
    description: 'A warm current flowing southward along the east coast of Australia, transporting warm water from the tropics.',
    coordinates: [
      [155, -15], [150, -20], [145, -25], [140, -30], [135, -35]
    ]
  },
  {
    name: 'Peru Current',
    type: 'cold',
    description: 'A cold current flowing northward along the west coast of South America, bringing cool water from the Antarctic.',
    coordinates: [
      [-80, -45], [-75, -40], [-70, -35], [-65, -30], [-60, -25]
    ]
  },
  {
    name: 'North Atlantic Drift',
    type: 'warm',
    description: 'A warm current that continues from the Gulf Stream, flowing northeastward across the North Atlantic Ocean.',
    coordinates: [
      [-50, 45], [-40, 50], [-30, 55], [-20, 60], [-10, 65]
    ]
  },
  {
    name: 'Oyashio Current',
    type: 'cold',
    description: 'A cold current flowing southward along the east coast of Japan, bringing cool water from the Arctic.',
    coordinates: [
      [145, 50], [140, 45], [135, 40], [130, 35], [125, 30]
    ]
  }
];

async function initDatabase() {
  try {
    console.log('Connecting to database...');
    
    // Create the ocean_currents table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ocean_currents (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        type VARCHAR(50) NOT NULL CHECK (type IN ('warm', 'cold')),
        description TEXT NOT NULL,
        coordinates JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await pool.query(createTableQuery);
    console.log('Table created successfully');
    
    // Clear existing data
    await pool.query('DELETE FROM ocean_currents');
    console.log('Cleared existing data');
    
    // Insert sample data
    for (const current of sampleCurrents) {
      await pool.query(
        `INSERT INTO ocean_currents (name, type, description, coordinates) 
         VALUES ($1, $2, $3, $4)`,
        [current.name, current.type, current.description, JSON.stringify(current.coordinates)]
      );
    }
    
    console.log(`Inserted ${sampleCurrents.length} ocean currents`);
    
    // Verify the data
    const result = await pool.query('SELECT COUNT(*) FROM ocean_currents');
    console.log(`Total ocean currents in database: ${result.rows[0].count}`);
    
    console.log('Database initialization completed successfully!');
    
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await pool.end();
  }
}

initDatabase(); 