import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css';

// Components
import Scene from './components/Scene/Scene';
import InfoBox from './components/UI/InfoBox';
import Controls from './components/UI/Controls';

function App() {
  const [selected, setSelected] = useState(null);
  const [showCurrents, setShowCurrents] = useState(true);

  const handleCurrentClick = (current) => {
    setSelected(current);
  };

  const handleCloseInfo = () => {
    setSelected(null);
  };

  const handleToggleCurrents = () => {
    setShowCurrents(!showCurrents);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', position: 'relative' }}>
      <InfoBox current={selected} onClose={handleCloseInfo} />
      <Controls 
        onToggleCurrents={handleToggleCurrents} 
        showCurrents={showCurrents}
      />
      
      <Canvas camera={{ position: [4, 0, 4], fov: 50 }}>
        <Scene 
          showCurrents={showCurrents}
          onCurrentClick={handleCurrentClick}
          selectedCurrent={selected}
        />
      </Canvas>
    </div>
  );
}

export default App;
