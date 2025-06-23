import { Stars, OrbitControls } from '@react-three/drei';
import Earth from '../Earth/Earth';
import OceanCurrent from '../OceanCurrents/OceanCurrent';
import { oceanCurrents } from '../../data/oceanCurrents';

function Scene({ showCurrents, onCurrentClick, selectedCurrent }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.5}
        castShadow={false}
      />
      
      <directionalLight 
        position={[-5, 3, 5]} 
        intensity={0.8}
        castShadow={false}
      />
      
      <directionalLight 
        position={[0, -5, 0]} 
        intensity={0.4}
        castShadow={false}
      />
      
      <directionalLight 
        position={[0, 0, 10]} 
        intensity={0.7}
        castShadow={false}
      />
      
      <directionalLight 
        position={[10, 0, 0]} 
        intensity={0.5}
        castShadow={false}
      />
      
      <directionalLight 
        position={[-10, 0, 0]} 
        intensity={0.5}
        castShadow={false}
      />
      
      <pointLight 
        position={[0, 0, 8]} 
        intensity={0.3}
        distance={25}
      />
      
      <pointLight 
        position={[0, 0, -8]} 
        intensity={0.3}
        distance={25}
      />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <Earth />
      
      {showCurrents && oceanCurrents.map((current) => (
        <OceanCurrent 
          key={current.name} 
          current={current} 
          onClick={onCurrentClick}
          isSelected={selectedCurrent?.name === current.name}
        />
      ))}
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default Scene; 