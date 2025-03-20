import { useState, useCallback, useEffect } from 'react'
import { Vector3 } from 'three'

export function useBallInteraction({ characterPosition, onInteractionStart, onInteractionEnd }) {
  const [isInteracting, setIsInteracting] = useState(false)
  const [interactionType, setInteractionType] = useState(null)

  useEffect(() => {
    if (!characterPosition) return

    const handleKeyPress = (e) => {
      switch (e.key.toLowerCase()) {
        case 'e':
          // Toggle pickup/drop
          setIsInteracting(true)
          setInteractionType('pickup')
          onInteractionStart?.('pickup')
          break
        case 'f':
          // Kick
          if (!isInteracting) {
            setIsInteracting(true)
            setInteractionType('kick')
            // Calculate kick direction based on character's current facing direction
            const kickDirection = new Vector3(
              Math.sin(characterPosition.rotation || 0),
              0,
              Math.cos(characterPosition.rotation || 0)
            )
            onInteractionStart?.('kick', kickDirection)
          }
          break
      }
    }

    const handleKeyUp = (e) => {
      if (['e', 'f'].includes(e.key.toLowerCase())) {
        setIsInteracting(false)
        setInteractionType(null)
        onInteractionEnd?.()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [characterPosition, isInteracting, onInteractionStart, onInteractionEnd])

  return {
    isInteracting,
    interactionType
  }
} 