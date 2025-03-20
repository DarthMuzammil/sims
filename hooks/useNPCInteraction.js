import { useState, useEffect } from "react"
import { Vector3 } from "three"

export function useNPCInteraction({ 
  playerPosition, 
  npcPosition, 
  interactionDistance = 3,
  onInteract = () => {} 
}) {
  const [canInteract, setCanInteract] = useState(false)
  const [chatting, setChatting] = useState(false)
  const [response, setResponse] = useState("")

  useEffect(() => {
    // Check if player is close enough to interact
    const distance = playerPosition.distanceTo(npcPosition)
    const canInteractNow = distance < interactionDistance

    if (canInteractNow !== canInteract) {
      setCanInteract(canInteractNow)
    }
  }, [playerPosition, npcPosition, interactionDistance, canInteract])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "e" && canInteract && !chatting) {
        onInteract()
        setChatting(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [canInteract, chatting, onInteract])

  const handleChatOption = (option) => {
    setResponse(option)
    setTimeout(() => {
      setResponse("")
      setChatting(false)
    }, 3000)
  }

  return {
    canInteract,
    chatting,
    response,
    handleChatOption
  }
} 