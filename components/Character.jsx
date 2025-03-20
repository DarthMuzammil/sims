"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Billboard } from "@react-three/drei"
import { CHARACTER_COLORS } from "../constants/character"
import { STATUS_TEXT, CHARACTER_Y } from "../constants/player"
import { useCharacterMovement } from "../hooks/useCharacterMovement"
import { CharacterModel } from "./shared/CharacterModel"
import { Katana } from "./scene/Katana"

export function Character({ position, setPosition, name, hasSword, onRotationChange }) {
  const characterRef = useRef()
  const swordRef = useRef()
  const { isMoving, updateMovement } = useCharacterMovement({
    initialPosition: position,
    onPositionChange: setPosition
  })

  useFrame((state) => {
    if (characterRef.current) {
      const { rotation } = updateMovement()
      if (rotation !== null) {
        characterRef.current.rotation.y = rotation
        onRotationChange?.(rotation)
      }
    }

    // Update sword position based on character movement
    if (swordRef.current && hasSword) {
      const time = state.clock.getElapsedTime()
      const walkCycle = Math.sin(time * 8) * (isMoving ? 0.05 : 0.02)
      const bobCycle = Math.cos(time * 4) * (isMoving ? 0.03 : 0.01)
      
      // Position sword relative to character's right side with smoother movement
      const basePosition = [
        0.6,  // Right side offset
        1.3,  // Height
        0.2   // Forward offset
      ]

      swordRef.current.position.set(
        basePosition[0] + bobCycle,
        basePosition[1] + walkCycle,
        basePosition[2]
      )

      // Rotate sword based on character movement with smoother transitions
      const baseRotation = [
        Math.PI * 0.1,  // Slight upward tilt
        rotation,  // Follow character rotation
        Math.PI * 0.25   // Angled stance
      ]

      swordRef.current.rotation.set(
        baseRotation[0] + (isMoving ? walkCycle * 0.3 : 0),
        baseRotation[1],
        baseRotation[2] + (isMoving ? bobCycle * 0.1 : 0)
      )
    }
  })

  return (
    <group ref={characterRef} position={[position.x, CHARACTER_Y, position.z]}>
      <CharacterModel colors={CHARACTER_COLORS.PLAYER} isMoving={isMoving} />
      
      {/* Enhanced sword display when equipped */}
      {hasSword && (
        <group ref={swordRef} position={[0.6, 1.3, 0.2]}>
          <Katana 
            scale={0.7}
            rotation={[Math.PI * 0.1, 0, Math.PI * 0.25]}
            isEquipped={true}
          />
        </group>
      )}

      {/* Character name with Billboard */}
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          position={[0, 2.5, 0]}
          color={CHARACTER_COLORS.PLAYER.TEXT}
          fontSize={0.3}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor={CHARACTER_COLORS.PLAYER.TEXT_OUTLINE}
        >
          {name || "Player"}
        </Text>
      </Billboard>
      {/* Status indicator */}
      {/* <Text
        position={[0, 2.5, 0]}
        color={CHARACTER_COLORS.PLAYER.TEXT}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor={CHARACTER_COLORS.PLAYER.TEXT_OUTLINE}>
        {isMoving ? STATUS_TEXT.MOVING : STATUS_TEXT.IDLE}
      </Text> */}
    </group>
  )
} 