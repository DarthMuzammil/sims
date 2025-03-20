"use client"

import { Plane } from "@react-three/drei"
import { useTexture } from "@react-three/drei"

export function Floor() {
  const texture = useTexture("/floor.svg?height=512&width=512")

  return (
    <Plane
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.01, 0]}
      args={[20, 20]}>
      <meshStandardMaterial 
        map={texture} 
        color="#c4c4b5" 
        roughness={0.5}
        metalness={0.1}
        envMapIntensity={0.5}
      />
    </Plane>
  );
} 