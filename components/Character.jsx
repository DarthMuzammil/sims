"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { CHARACTER_COLORS } from "../constants/character"
import { BOUNDS, STATUS_TEXT } from "../constants/player"
import { useCharacterMovement } from "../hooks/useCharacterMovement"
import { CharacterModel } from "./shared/CharacterModel"

export function Character({ position, setPosition, name }) {
  const characterRef = useRef()
  const { isMoving, updateMovement } = useCharacterMovement({
    initialPosition: position,
    onPositionChange: setPosition
  })

  useFrame(() => {
    if (characterRef.current) {
      const { rotation } = updateMovement()
      if (rotation !== null) {
        characterRef.current.rotation.y = rotation
      }
    }
  })

  return (
    <group ref={characterRef} position={[position.x, BOUNDS.CHARACTER_Y, position.z]}>
      <CharacterModel colors={CHARACTER_COLORS.PLAYER} />
      {/* Character name */}
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