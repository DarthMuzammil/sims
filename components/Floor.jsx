"use client"

import { Plane } from "@react-three/drei"
import { useTexture } from "@react-three/drei"

export function Floor() {
  const texture = useTexture("/floor.svg?height=512&width=512")

  return (
    (<Plane
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      args={[20, 20]}>
      <meshStandardMaterial map={texture} color="#a9b665" roughness={0.8} />
    </Plane>)
  );
} 