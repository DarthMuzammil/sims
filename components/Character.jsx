"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Text } from "@react-three/drei"
import { Vector3 } from "three"
import { CHARACTER_COLORS, MATERIAL_PROPERTIES } from "../constants/colors"
import { MOVEMENT, BOUNDS, CHARACTER_DIMENSIONS, STATUS_TEXT } from "../constants/player"

export function Character({ position, setPosition }) {
  const characterRef = useRef()
  const [targetPosition, setTargetPosition] = useState(new Vector3(position.x, position.y, position.z))
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newTarget = targetPosition.clone()

      switch (e.key.toLowerCase()) {
        case "w":
          newTarget.z -= MOVEMENT.STEP_SIZE
          break
        case "s":
          newTarget.z += MOVEMENT.STEP_SIZE
          break
        case "a":
          newTarget.x -= MOVEMENT.STEP_SIZE
          break
        case "d":
          newTarget.x += MOVEMENT.STEP_SIZE
          break
        case "e":
          console.log("Trying to interact with nearby objects")
          break
        default:
          return
      }

      // Limit movement within bounds
      newTarget.x = Math.max(BOUNDS.MIN_X, Math.min(BOUNDS.MAX_X, newTarget.x))
      newTarget.z = Math.max(BOUNDS.MIN_Z, Math.min(BOUNDS.MAX_Z, newTarget.z))

      setTargetPosition(newTarget)
      setIsMoving(true)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [targetPosition])

  useFrame(() => {
    if (position.distanceTo(targetPosition) > MOVEMENT.INTERACTION_DISTANCE) {
      const newPos = position.clone().lerp(targetPosition, MOVEMENT.MOVE_SPEED)
      setPosition(newPos)

      // Update character rotation to face movement direction
      if (characterRef.current) {
        const direction = new Vector3().subVectors(targetPosition, position)
        if (direction.length() > MOVEMENT.INTERACTION_DISTANCE) {
          const angle = Math.atan2(direction.x, direction.z)
          characterRef.current.rotation.y = angle
        }
      }
    } else if (isMoving) {
      setIsMoving(false)
    }
  })

  return (
    <group ref={characterRef} position={[position.x, BOUNDS.CHARACTER_Y, position.z]}>
      {/* Character body */}
      <Box castShadow args={CHARACTER_DIMENSIONS.BODY} position={[0, 0.75, 0]}>
        <meshStandardMaterial color={CHARACTER_COLORS.BODY} roughness={MATERIAL_PROPERTIES.BODY_ROUGHNESS} />
      </Box>
      {/* Character head */}
      <Box castShadow args={CHARACTER_DIMENSIONS.HEAD} position={[0, 1.85, 0]}>
        <meshStandardMaterial color={CHARACTER_COLORS.HEAD} roughness={MATERIAL_PROPERTIES.HEAD_ROUGHNESS} />
      </Box>
      {/* Character arms */}
      <Box castShadow args={CHARACTER_DIMENSIONS.ARMS} position={[0.6, 0.75, 0]}>
        <meshStandardMaterial color={CHARACTER_COLORS.BODY} roughness={MATERIAL_PROPERTIES.BODY_ROUGHNESS} />
      </Box>
      <Box castShadow args={CHARACTER_DIMENSIONS.ARMS} position={[-0.6, 0.75, 0]}>
        <meshStandardMaterial color={CHARACTER_COLORS.BODY} roughness={MATERIAL_PROPERTIES.BODY_ROUGHNESS} />
      </Box>
      {/* Character legs */}
      <Box castShadow args={CHARACTER_DIMENSIONS.LEGS} position={[0.2, 0, 0]}>
        <meshStandardMaterial color={CHARACTER_COLORS.LEGS} roughness={MATERIAL_PROPERTIES.LEGS_ROUGHNESS} />
      </Box>
      <Box castShadow args={CHARACTER_DIMENSIONS.LEGS} position={[-0.2, 0, 0]}>
        <meshStandardMaterial color={CHARACTER_COLORS.LEGS} roughness={MATERIAL_PROPERTIES.LEGS_ROUGHNESS} />
      </Box>
      {/* Character eyes */}
      <Box args={CHARACTER_DIMENSIONS.FEATURES} position={[0.2, 1.9, 0.35]}>
        <meshBasicMaterial color={CHARACTER_COLORS.EYES} />
      </Box>
      <Box args={CHARACTER_DIMENSIONS.FEATURES} position={[-0.2, 1.9, 0.35]}>
        <meshBasicMaterial color={CHARACTER_COLORS.EYES} />
      </Box>
      {/* Character mouth */}
      <Box args={CHARACTER_DIMENSIONS.MOUTH} position={[0, 1.7, 0.35]}>
        <meshBasicMaterial color={CHARACTER_COLORS.MOUTH} />
      </Box>
      {/* Status indicator */}
      <Text
        position={[0, 2.5, 0]}
        color={CHARACTER_COLORS.TEXT}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor={CHARACTER_COLORS.TEXT_OUTLINE}>
        {isMoving ? STATUS_TEXT.MOVING : STATUS_TEXT.IDLE}
      </Text>
    </group>
  );
} 