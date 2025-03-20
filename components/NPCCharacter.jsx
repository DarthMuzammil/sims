"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Text } from "@react-three/drei"
import { Vector3 } from "three"

export function NPCCharacter({ playerPosition, onInteract, chatting, chatOptions, response }) {
  const npcRef = useRef()
  const npcPosition = new Vector3(5, 1, -5)
  const [canInteract, setCanInteract] = useState(false)

  useFrame(() => {
    // Check if player is close enough to interact
    const distance = playerPosition.distanceTo(npcPosition)
    const canInteractNow = distance < 3

    if (canInteractNow !== canInteract) {
      setCanInteract(canInteractNow)
    }

    // Make NPC face the player
    if (npcRef.current) {
      const direction = new Vector3().subVectors(playerPosition, npcPosition)
      if (direction.length() > 0.1) {
        const angle = Math.atan2(direction.x, direction.z)
        npcRef.current.rotation.y = angle
      }
    }
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "e" && canInteract && !chatting) {
        onInteract()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canInteract, chatting, onInteract])

  return (
    (<group ref={npcRef} position={[npcPosition.x, 1, npcPosition.z]}>
      {/* NPC body - different color from player */}
      <Box castShadow args={[0.8, 1.5, 0.5]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#d3869b" roughness={0.6} />
      </Box>
      {/* NPC head */}
      <Box castShadow args={[0.7, 0.7, 0.7]} position={[0, 1.85, 0]}>
        <meshStandardMaterial color="#d79921" roughness={0.5} />
      </Box>
      {/* NPC arms */}
      <Box castShadow args={[0.25, 1, 0.25]} position={[0.6, 0.75, 0]}>
        <meshStandardMaterial color="#d3869b" roughness={0.6} />
      </Box>
      <Box castShadow args={[0.25, 1, 0.25]} position={[-0.6, 0.75, 0]}>
        <meshStandardMaterial color="#d3869b" roughness={0.6} />
      </Box>
      {/* NPC legs */}
      <Box castShadow args={[0.3, 0.8, 0.3]} position={[0.2, 0, 0]}>
        <meshStandardMaterial color="#689d6a" roughness={0.5} />
      </Box>
      <Box castShadow args={[0.3, 0.8, 0.3]} position={[-0.2, 0, 0]}>
        <meshStandardMaterial color="#689d6a" roughness={0.5} />
      </Box>
      {/* NPC eyes */}
      <Box args={[0.1, 0.1, 0.1]} position={[0.2, 1.9, 0.35]}>
        <meshBasicMaterial color="black" />
      </Box>
      <Box args={[0.1, 0.1, 0.1]} position={[-0.2, 1.9, 0.35]}>
        <meshBasicMaterial color="black" />
      </Box>
      {/* NPC mouth */}
      <Box args={[0.3, 0.05, 0.1]} position={[0, 1.7, 0.35]}>
        <meshBasicMaterial color="black" />
      </Box>
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
    </group>)
  );
} 