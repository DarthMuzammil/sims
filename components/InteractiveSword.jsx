"use client"

import { useState, useEffect } from "react"
import { Text } from "@react-three/drei"
import { WoodenAxe } from "./scene/WoodenAxe"

export function InteractiveSword({ 
  position = [0, 1.5, 0],
  name = "Wooden Axe",
  onPickup
}) {
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto'
  }, [isHovered])

  const handleInteraction = () => {
    if (onPickup) {
      onPickup()
    }
  }

  return (
    <group position={position}>
      {isHovered && (
        <Text
          position={[0, 2, 0]}
          color="white"
          fontSize={0.5}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000">
          {`Pick up ${name}`}
        </Text>
      )}
      
      <WoodenAxe 
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={2}
        isHovered={isHovered}
        onClick={handleInteraction}
        onHover={setIsHovered}
      />

      {/* Invisible interaction box */}
      <mesh
        position={[0, 0, 0]}
        visible={false}>
        <boxGeometry args={[1.5, 2.5, 1.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  )
} 