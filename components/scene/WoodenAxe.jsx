import { useEffect } from "react"
import * as THREE from "three"

export function WoodenAxe({ 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  isHovered = false,
  onClick,
  onHover
}) {
  // Create a simple axe shape using basic geometries
  return (
    <group
      position={position}
      rotation={rotation}
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      onClick={onClick}
      onPointerOver={() => onHover?.(true)}
      onPointerOut={() => onHover?.(false)}
    >
      {/* Axe handle */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial 
          color={isHovered ? "#8B4513" : "#654321"}
          roughness={0.8}
        />
      </mesh>

      {/* Axe head */}
      <group position={[0, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Main blade */}
        <mesh>
          <boxGeometry args={[0.4, 0.15, 0.05]} />
          <meshStandardMaterial 
            color={isHovered ? "#A8A8A8" : "#808080"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Blade edge */}
        <mesh position={[0.2, 0, 0]}>
          <coneGeometry args={[0.08, 0.15, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial 
            color={isHovered ? "#A8A8A8" : "#808080"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  )
} 