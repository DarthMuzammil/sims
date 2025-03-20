"use client"

import { Text, Box } from "@react-three/drei"

export function ChatOptionsDialog({ options }) {
  return (
    <group position={[0, 3, 0]}>
      <Box args={[4, 2, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#282828" opacity={0.8} transparent />
      </Box>
      {options.map((option, index) => (
        <Text
          key={index}
          position={[0, 0.5 - index * 0.5, 0.1]}
          color="white"
          fontSize={0.25}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
          maxWidth={3.5}>
          {`${index + 1}. ${option}`}
        </Text>
      ))}
    </group>
  )
} 