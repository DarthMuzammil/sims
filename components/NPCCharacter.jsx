"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box } from "@react-three/drei"
import { Vector3 } from "three"
import { CHARACTER_COLORS } from "../constants/character"
import { useNPCInteraction } from "../hooks/useNPCInteraction"
import { CharacterModel } from "./shared/CharacterModel"

export function NPCCharacter({ playerPosition, onInteract, chatOptions = [], response }) {
  const npcRef = useRef()
  const npcPosition = new Vector3(5, 1, -5)
  
  const { canInteract, chatting } = useNPCInteraction({
    playerPosition,
    npcPosition,
    onInteract
  })

  useFrame(() => {
    // Make NPC face the player
    if (npcRef.current) {
      const direction = new Vector3().subVectors(playerPosition, npcPosition)
      if (direction.length() > 0.1) {
        const angle = Math.atan2(direction.x, direction.z)
        npcRef.current.rotation.y = angle
      }
    }
  })

  return (
    <group ref={npcRef} position={[npcPosition.x, 1, npcPosition.z]}>
      <CharacterModel colors={CHARACTER_COLORS.NPC} />
      
      {/* Interaction indicator */}
      {canInteract && !chatting && (
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
      )}

      {/* Chat options */}
      {chatting && !response && (
        <group position={[0, 3, 0]}>
          <Box args={[4, 2, 0.1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#282828" opacity={0.8} transparent />
          </Box>
          {chatOptions.map((option, index) => (
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
      )}

      {/* NPC response */}
      {response && (
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
      )}
    </group>
  )
} 