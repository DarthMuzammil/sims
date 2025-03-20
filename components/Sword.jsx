'use client';

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/three';

export default function Sword({ 
  texturePath = "/swords/katana.png", 
  position = [0, 0, 0], 
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  onClick
}) {
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(TextureLoader, texturePath);
  
  const springs = useSpring({
    scale: hovered ? [1.1, 2.2, 1.1] : scale,
    config: { tension: 300, friction: 10 }
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    texture.needsUpdate = true;
  }, [hovered, texture]);

  return (
    <animated.mesh 
      position={position} 
      scale={springs.scale}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial 
        map={texture} 
        transparent 
        alphaTest={0.5}
        metalness={0.5}
        roughness={0.5}
      />
    </animated.mesh>
  );
} 