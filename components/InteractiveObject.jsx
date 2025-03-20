"use client"

import { useState } from "react"
import { Text } from "@react-three/drei"

export function InteractiveObject({ position, name }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    (<group position={position}>
      {isHovered && (
        <Text
          position={[0, 1, 0]}
          color="white"
          fontSize={0.5}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000">
          {name}
        </Text>
      )}
      <mesh
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        onClick={() => console.log(`Interacting with ${name}`)}
        visible={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>)
  );
} 