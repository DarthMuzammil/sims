"use client"

import { useState, useEffect } from "react"
import { Vector3 } from "three"
import { MOVEMENT, getBounds, clampToBounds } from "../constants/player"
import { useFloor } from "@/contexts/FloorContext"

export function useCharacterMovement({ 
  initialPosition = new Vector3(0, 0, 0),
  onPositionChange = () => {},
  movementEnabled = true 
}) {
  const [position, setPosition] = useState(initialPosition)
  const [velocity, setVelocity] = useState(new Vector3(0, 0, 0))
  const [input, setInput] = useState({ x: 0, z: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const { floorSections } = useFloor()

  useEffect(() => {
    if (!movementEnabled || typeof window === 'undefined') return;

    const handleKeyDown = (e) => {
      const newInput = { ...input }
      
      switch (e.key.toLowerCase()) {
        case "w":
          newInput.z = -1
          break
        case "s":
          newInput.z = 1
          break
        case "a":
          newInput.x = -1
          break
        case "d":
          newInput.x = 1
          break
      }
      
      setInput(newInput)
      setIsMoving(true)
    }

    const handleKeyUp = (e) => {
      const newInput = { ...input }
      
      switch (e.key.toLowerCase()) {
        case "w":
          if (newInput.z < 0) newInput.z = 0
          break
        case "s":
          if (newInput.z > 0) newInput.z = 0
          break
        case "a":
          if (newInput.x < 0) newInput.x = 0
          break
        case "d":
          if (newInput.x > 0) newInput.x = 0
          break
      }
      
      setInput(newInput)
      if (newInput.x === 0 && newInput.z === 0) {
        setIsMoving(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [input, movementEnabled])

  const updateMovement = () => {
    if (!movementEnabled) return { position, rotation: 0 }

    // Apply acceleration based on input
    const newVelocity = velocity.clone()
    newVelocity.x += input.x * MOVEMENT.ACCELERATION
    newVelocity.z += input.z * MOVEMENT.ACCELERATION

    // Apply friction
    newVelocity.multiplyScalar(MOVEMENT.FRICTION)

    // Clamp velocity to maximum speed
    if (newVelocity.length() > MOVEMENT.MAX_VELOCITY) {
      newVelocity.normalize().multiplyScalar(MOVEMENT.MAX_VELOCITY)
    }

    // Update position
    const newPosition = position.clone().add(newVelocity)

    // Get dynamic bounds based on current floor sections
    const bounds = getBounds(floorSections)

    // Clamp position to bounds
    const clampedPosition = clampToBounds(newPosition, bounds)

    setVelocity(newVelocity)
    setPosition(clampedPosition)
    onPositionChange(clampedPosition)

    // Calculate rotation
    const rotation = (newVelocity.x !== 0 || newVelocity.z !== 0) 
      ? Math.atan2(newVelocity.x, newVelocity.z)
      : null

    return { position: clampedPosition, rotation }
  }

  return {
    position,
    isMoving,
    updateMovement
  }
} 