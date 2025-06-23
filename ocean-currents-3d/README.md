# Ocean Currents 3D Visualization

A 3D interactive visualization of Earth's ocean currents built with React, React Three Fiber, and Node.js.

## 🌊 Features

### ✅ Success Parameters Achieved

1. **3D Model of Earth** - Realistic Earth with high-resolution textures
2. **User Rotation** - Interactive 3D controls to rotate Earth on its axis
3. **Animated Ocean Currents** - Smooth flowing animations showing current movement
4. **Color-Coded Currents** - Warm currents in red, cold currents in blue
5. **Click Interaction** - Click any current to see its name and detailed information

### 🎯 Additional Features

- **Realistic Earth Textures** - High-resolution Earth surface with bump mapping
- **Multiple Animated Particles** - Each current has multiple flowing particles
- **Interactive Controls** - Toggle currents on/off, zoom, and rotate
- **Responsive Design** - Works on different screen sizes
- **Backend API** - RESTful API with PostgreSQL database
- **Database Integration** - Full CRUD operations for ocean currents

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **React Three Fiber** - 3D graphics library
- **Three.js** - 3D rendering engine
- **@react-three/drei** - Three.js helpers

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ocean-currents-3d
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your PostgreSQL credentials.

4. **Initialize the database:**
   ```bash
   npm run init-db
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

## 🎮 How to Use

### 3D Controls
- **Mouse Drag** - Rotate the Earth
- **Mouse Wheel** - Zoom in/out
- **Click Ocean Currents** - View detailed information

### UI Controls
- **Toggle Currents** - Show/hide all ocean currents
- **Info Panel** - Displays current details when clicked

## 📊 API Endpoints

### Ocean Currents
- `GET /api/currents` - Get all ocean currents
- `GET /api/currents/:id` - Get specific current
- `POST /api/currents` - Create new current
- `PUT /api/currents/:id` - Update current
- `DELETE /api/currents/:id` - Delete current

### Health Check
- `GET /api/health` - Server status

## 🗄️ Database Schema

```sql
CREATE TABLE ocean_currents (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('warm', 'cold')),
  description TEXT NOT NULL,
  coordinates JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌍 Ocean Currents Included

### Warm Currents (Red)
- Gulf Stream
- Kuroshio Current
- Brazil Current
- East Australian Current
- North Atlantic Drift

### Cold Currents (Blue)
- California Current
- Canary Current
- Benguela Current
- Peru Current
- Oyashio Current

## 🔧 Development

### Project Structure
```
ocean-currents-3d/
├── src/
│   ├── App.jsx          # Main application component
│   ├── oceanCurrents.js # Ocean currents data
│   └── ...
├── backend/
│   ├── server.js        # Express server
│   ├── init-database.js # Database initialization
│   └── ...
└── README.md
```

### Adding New Currents

1. **Via Frontend (Temporary):**
   Edit `src/oceanCurrents.js` and add new current data.

2. **Via Backend (Permanent):**
   Use the API endpoints to add currents to the database.

### Customization

- **Earth Texture** - Replace texture URLs in `Earth` component
- **Animation Speed** - Adjust particle speed in `OceanCurrent` component
- **Colors** - Modify color values for warm/cold currents
- **UI Styling** - Update CSS styles in components

## 🚀 Deployment

### Frontend
```bash
npm run build
```
Deploy the `dist` folder to your hosting service.

### Backend
```bash
npm start
```
Deploy to your Node.js hosting service (Heroku, Railway, etc.).

## 📝 License

MIT License - feel free to use this project for educational or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Enjoy exploring Earth's ocean currents in 3D! 🌊🌍**
