'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sword from './Sword';
import { useState } from 'react';

export default function SwordScene() {
  const [selectedSword, setSelectedSword] = useState(null);

  const handleSwordClick = (index) => {
    setSelectedSword(index);
    console.log(`Selected sword ${index}`);
  };

  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <directionalLight position={[-5, 5, 5]} intensity={1} />
      
      <group position={[0, 0, 0]}>
        <Sword 
          texturePath="/swords/katana.png" 
          position={[-2, 0, 0]} 
          scale={[1, 2, 1]}
          rotation={[0, selectedSword === 1 ? Math.PI * 2 : 0, 0]}
          onClick={() => handleSwordClick(1)}
        />
        <Sword 
          texturePath="/swords/knifeblack.png" 
          position={[0, 0, 0]} 
          scale={[1, 2, 1]}
          rotation={[0, selectedSword === 2 ? Math.PI * 2 : 0, 0]}
          onClick={() => handleSwordClick(2)}
        />
        <Sword 
          texturePath="/swords/swordblack.png" 
          position={[2, 0, 0]} 
          scale={[1, 2, 1]}
          rotation={[0, selectedSword === 3 ? Math.PI * 2 : 0, 0]}
          onClick={() => handleSwordClick(3)}
        />
      </group>
      
      <OrbitControls 
        enableZoom={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </Canvas>
  );
} 