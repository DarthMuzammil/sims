"use client"

import { useTexture } from "@react-three/drei"
import * as THREE from 'three'

export function Sky() {
  const texture = useTexture("/sky.png")
  
  // Make the texture repeat
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 1)
  
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        color="#ffffff"
      />
    </mesh>
  )
} 