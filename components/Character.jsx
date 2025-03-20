"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Text } from "@react-three/drei"
import { Vector3 } from "three"

export function Character({ position, setPosition }) {
  const characterRef = useRef()
  const [targetPosition, setTargetPosition] = useState(new Vector3(position.x, position.y, position.z))
  const [isMoving, setIsMoving] = useState(false)
  const moveSpeed = 0.05

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newTarget = targetPosition.clone()

      switch (e.key.toLowerCase()) {
        case "w":
          newTarget.z -= 0.5
          break
        case "s":
          newTarget.z += 0.5
          break
        case "a":
          newTarget.x -= 0.5
          break
        case "d":
          newTarget.x += 0.5
          break
        case "e":
          console.log("Trying to interact with nearby objects")
          break
        default:
          return
      }

      // Limit movement within bounds
      newTarget.x = Math.max(-9, Math.min(9, newTarget.x))
      newTarget.z = Math.max(-9, Math.min(9, newTarget.z))

      setTargetPosition(newTarget)
      setIsMoving(true)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [targetPosition])

  useFrame(() => {
    if (position.distanceTo(targetPosition) > 0.1) {
      const newPos = position.clone().lerp(targetPosition, moveSpeed)
      setPosition(newPos)

      // Update character rotation to face movement direction
      if (characterRef.current) {
        const direction = new Vector3().subVectors(targetPosition, position)
        if (direction.length() > 0.1) {
          const angle = Math.atan2(direction.x, direction.z)
          characterRef.current.rotation.y = angle
        }
      }
    } else if (isMoving) {
      setIsMoving(false)
    }
  })

  return (
    (<group ref={characterRef} position={[position.x, 1, position.z]}>
      {/* Character body */}
      <Box castShadow args={[0.8, 1.5, 0.5]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#b8bb26" roughness={0.6} />
      </Box>
      {/* Character head */}
      <Box castShadow args={[0.7, 0.7, 0.7]} position={[0, 1.85, 0]}>
        <meshStandardMaterial color="#fabd2f" roughness={0.5} />
      </Box>
      {/* Character arms */}
      <Box castShadow args={[0.25, 1, 0.25]} position={[0.6, 0.75, 0]}>
        <meshStandardMaterial color="#b8bb26" roughness={0.6} />
      </Box>
      <Box castShadow args={[0.25, 1, 0.25]} position={[-0.6, 0.75, 0]}>
        <meshStandardMaterial color="#b8bb26" roughness={0.6} />
      </Box>
      {/* Character legs */}
      <Box castShadow args={[0.3, 0.8, 0.3]} position={[0.2, 0, 0]}>
        <meshStandardMaterial color="#458588" roughness={0.5} />
      </Box>
      <Box castShadow args={[0.3, 0.8, 0.3]} position={[-0.2, 0, 0]}>
        <meshStandardMaterial color="#458588" roughness={0.5} />
      </Box>
      {/* Character eyes */}
      <Box args={[0.1, 0.1, 0.1]} position={[0.2, 1.9, 0.35]}>
        <meshBasicMaterial color="black" />
      </Box>
      <Box args={[0.1, 0.1, 0.1]} position={[-0.2, 1.9, 0.35]}>
        <meshBasicMaterial color="black" />
      </Box>
      {/* Character mouth */}
      <Box args={[0.3, 0.05, 0.1]} position={[0, 1.7, 0.35]}>
        <meshBasicMaterial color="black" />
      </Box>
      {/* Status indicator */}
      <Text
        position={[0, 2.5, 0]}
        color="white"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000">
        {isMoving ? "Walking" : "Idle"}
      </Text>
    </group>)
  );
} 