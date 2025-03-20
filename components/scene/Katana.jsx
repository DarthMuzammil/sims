'use client';

import { useRef } from "react";
import { Cylinder, Torus, Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from '@react-spring/three';

// Changed from export function to export const to match the named import
export const Katana = ({ 
  position = [0, 0.5, 0], 
  rotation = [0, 0, 0], 
  scale = 1,
  isHovered = false,
  isEquipped = false,
  onClick,
  onHover 
}) => {
  const katanaGroup = useRef();
  const bladeRef = useRef();
  
  // Enhanced spring animations for different states
  const springs = useSpring({
    scale: isHovered 
      ? [scale * 1.1, scale * 1.1, scale * 1.1] 
      : [scale, scale, scale],
    rotation: isHovered && !isEquipped
      ? [rotation[0], rotation[1] + Math.PI * 0.1, rotation[2]] 
      : rotation,
    position: [
      position[0],
      position[1] + (isHovered && !isEquipped ? 0.2 : 0),
      position[2]
    ],
    config: { 
      tension: 300,
      friction: 10
    }
  });

  useFrame((state) => {
    if (katanaGroup.current && !isEquipped) {
      const time = state.clock.getElapsedTime();
      
      // Only apply floating animation when not equipped
      katanaGroup.current.position.y = position[1] + Math.sin(time * 2) * 0.05;
      katanaGroup.current.rotation.y = rotation[1] + Math.sin(time * 1.5) * 0.1;
      
      // Dynamic blade gleam
      if (bladeRef.current) {
        const gleamIntensity = 0.1 + (Math.sin(time * 3) + 1) * (isHovered ? 0.3 : 0.1);
        bladeRef.current.material.emissiveIntensity = gleamIntensity;
      }
    }
  });

  return (
    <animated.group 
      ref={katanaGroup} 
      position={isEquipped ? position : springs.position}
      rotation={isEquipped ? rotation : springs.rotation}
      scale={springs.scale}
      onClick={!isEquipped ? onClick : undefined}
      onPointerOver={() => !isEquipped && onHover?.(true)}
      onPointerOut={() => !isEquipped && onHover?.(false)}
    >
      {/* Handle (Tsuka) */}
      <Cylinder 
        args={[0.07, 0.07, 1.2, 16]} 
        position={[0, 0.6, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial 
          color="#3c3836" 
          roughness={0.7} 
          metalness={0.1}
        />
      </Cylinder>

      {/* Handle wrapping (Tsuka-ito) */}
      <group position={[0, 0.6, 0]} rotation={[0, 0, 0]}>
        {[...Array(8)].map((_, i) => (
          <Box 
            key={i}
            args={[0.08, 0.02, 0.08]}
            position={[0, i * 0.15 - 0.5, 0]}
          >
            <meshStandardMaterial 
              color="#1d2021"
              roughness={0.9}
              metalness={0.1}
            />
          </Box>
        ))}
      </group>

      {/* Guard (Tsuba) */}
      <Torus 
        args={[0.15, 0.04, 16, 100]} 
        position={[0, 1.2, 0]} 
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <meshStandardMaterial 
          color="#fabd2f" 
          metalness={0.8} 
          roughness={0.3}
        />
      </Torus>

      {/* Blade (Shinogi-Zukuri style) */}
      <group position={[0, 2.5, 0]}>
        {/* Main blade body */}
        <Box 
          ref={bladeRef}
          args={[0.05, 2.5, 0.2]} 
          castShadow
        >
          <meshStandardMaterial 
            color="#ebdbb2" 
            metalness={1} 
            roughness={0.1}
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </Box>

        {/* Blade ridge (Shinogi) */}
        <Box 
          args={[0.01, 2.5, 0.05]} 
          position={[0.03, 0, 0.1]}
        >
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={0.3}
            metalness={1}
            roughness={0.1}
          />
        </Box>

        {/* Blade tip (Kissaki) */}
        <Box
          args={[0.05, 0.4, 0.2]}
          position={[0, 1.45, 0]}
          rotation={[0, 0, Math.PI * 0.1]}
        >
          <meshStandardMaterial 
            color="#ebdbb2" 
            metalness={1} 
            roughness={0.1}
          />
        </Box>
      </group>

      {/* Dynamic lighting based on state */}
      <pointLight
        intensity={isHovered ? 0.7 : 0.4}
        distance={isHovered ? 3 : 2}
        color={isHovered ? "#ffd700" : "#ffffff"}
        position={[0, 2.5, 0.3]}
      />
    </animated.group>
  );
}; 