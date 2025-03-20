"use client"

import { Text } from "@react-three/drei"

export function InteractionPrompt() {
  return (
    <group position={[0, 2.8, 0]}>
      <Text
        position={[0, 0, 0]}
        color="white"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000">
        Press E to chat
      </Text>
    </group>
  )
} 