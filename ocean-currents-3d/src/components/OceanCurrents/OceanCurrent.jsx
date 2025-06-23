import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { latLonToVec3 } from '../../utils/coordinates';

function OceanCurrent({ current, onClick, isSelected }) {
  const [t, setT] = useState(0);
  const [particles, setParticles] = useState([]);
  const textRef = useRef();
  
  useEffect(() => {
    const particleCount = 5;
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        t: i / particleCount,
        speed: 0.005 + Math.random() * 0.01
      });
    }
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    let frame;
    const animate = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        t: (p.t + p.speed) % 1
      })));
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  useFrame(({ camera }) => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  });

  const points = current.coordinates.map(([lon, lat]) => latLonToVec3(lat, lon));
  
  const curve = new THREE.CatmullRomCurve3(
    points.map(p => new THREE.Vector3(...p))
  );

  const curvePoints = curve.getPoints(50);
  const positions = new Float32Array(curvePoints.length * 3);
  
  curvePoints.forEach((point, i) => {
    positions[i * 3] = point.x;
    positions[i * 3 + 1] = point.y;
    positions[i * 3 + 2] = point.z;
  });

  const labelPos = curve.getPointAt(0.5);

  return (
    <group>
      <line 
        onClick={e => { 
          e.stopPropagation(); 
          onClick(current); 
        }}
        onPointerOver={e => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={e => {
          document.body.style.cursor = 'default';
        }}
      >
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={curvePoints.length}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          attach="material"
          color={current.type === 'warm' ? '#ff4444' : '#4444ff'}
          linewidth={isSelected ? 5 : 3}
          transparent
          opacity={isSelected ? 1 : 0.7}
        />
      </line>
      
      <Text
        ref={textRef}
        position={[labelPos.x * 1.05, labelPos.y * 1.05, labelPos.z * 1.05]}
        fontSize={0.06}
        color={current.type === 'warm' ? '#ff6666' : '#6666ff'}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.4}
        outlineWidth={0.001}
        outlineColor="#000000"
        outlineOpacity={0.9}
        fillOpacity={1}
        userData={{ current: current.name }}
        renderOrder={1}
      >
        {current.name}
      </Text>
      
      {particles.map(particle => {
        const pos = curve.getPointAt(particle.t);
        const nextPos = curve.getPointAt((particle.t + 0.02) % 1);
        
        const direction = new THREE.Vector3().subVectors(nextPos, pos).normalize();
        
        const rotation = new THREE.Euler();
        rotation.setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0), 
          direction
        ));
        
        return (
          <group key={particle.id} position={[pos.x, pos.y, pos.z]} rotation={rotation}>
            {/* Arrow shaft */}
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.1, 8]} />
              <meshStandardMaterial 
                color={current.type === 'warm' ? '#ff6666' : '#6666ff'} 
                emissive={current.type === 'warm' ? '#ff2222' : '#2222ff'}
                emissiveIntensity={0.3}
              />
            </mesh>
            
            {/* Arrow head */}
            <mesh position={[0, 0.1, 0]}>
              <coneGeometry args={[0.015, 0.03, 8]} />
              <meshStandardMaterial 
                color={current.type === 'warm' ? '#ff6666' : '#6666ff'} 
                emissive={current.type === 'warm' ? '#ff2222' : '#2222ff'}
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default OceanCurrent; 