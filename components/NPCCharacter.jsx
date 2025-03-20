"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Vector3 } from "three"
import { CHARACTER_COLORS } from "../constants/character"
import { useNPCInteraction } from "../hooks/useNPCInteraction"
import { CharacterModel } from "./shared/CharacterModel"
import { InteractionPrompt } from "./npc/InteractionPrompt"
import { ChatOptionsDialog } from "./npc/ChatOptionsDialog"
import { NPCResponseDialog } from "./npc/NPCResponseDialog"

export function NPCCharacter({ playerPosition, onInteract, chatOptions = [], response }) {
  const npcRef = useRef()
  const npcPosition = new Vector3(5, 1, -5)
  
  const { canInteract, chatting } = useNPCInteraction({
    playerPosition,
    npcPosition,
    onInteract
  })

  const updateNPCRotation = () => {
    if (npcRef.current) {
      const direction = new Vector3().subVectors(playerPosition, npcPosition)
      if (direction.length() > 0.1) {
        const angle = Math.atan2(direction.x, direction.z)
        npcRef.current.rotation.y = angle
      }
    }
  }

  useFrame(updateNPCRotation)

  return (
    <group ref={npcRef} position={[npcPosition.x, 1, npcPosition.z]}>
      <CharacterModel colors={CHARACTER_COLORS.NPC} />
      
      {/* Interaction indicator */}
      {canInteract && !chatting && <InteractionPrompt />}

      {/* Chat options */}
      {chatting && !response && <ChatOptionsDialog options={chatOptions} />}

      {/* NPC response */}
      {response && <NPCResponseDialog response={response} />}
    </group>
  )
} 