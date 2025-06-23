import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
  const earthTexture = useTexture({
    map: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    bumpMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
    specularMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
  });

  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={earthTexture.map}
        bumpMap={earthTexture.bumpMap}
        bumpScale={0.02}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
}

export default Earth; 