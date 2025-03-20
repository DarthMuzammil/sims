"use client"

import { Text, Box } from "@react-three/drei"

export function NPCResponseDialog({ response }) {
  return (
    <group position={[0, 3, 0]}>
      <Box args={[4, 1, 0.1]} position={[0, 0, 0]} radius={0.2}>
        <meshStandardMaterial color="#fbf1c7" opacity={0.9} transparent />
      </Box>
      <Text
        position={[0, 0, 0.1]}
        color="#282828"
        fontSize={0.25}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#fbf1c7"
        maxWidth={3.5}>
        {response}
      </Text>
    </group>
  )
} 