import { useRef, useState, forwardRef, useImperativeHandle, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { Vector3 } from 'three'
import { BOUNDS } from '../constants/player'

const BALL_CONFIG = {
  RADIUS: 0.3,
  SEGMENTS: 32,
  MASS: 1,
  FRICTION: 0.98,
  BOUNCE: 0.7,
  KICK_FORCE: 0.5,
  GRAVITY: -9.81,
  PICKUP_DISTANCE: 2,
  HOVER_HEIGHT: 1.5
}

export const Ball = forwardRef(({ position: initialPosition }, ref) => {
  const ballRef = useRef()
  const positionRef = useRef(new Vector3(...initialPosition))
  const velocityRef = useRef(new Vector3(0, 0, 0))
  const [isHeld, setIsHeld] = useState(false)
  const characterPositionRef = useRef(null)

  const handlePickup = useCallback((characterPosition) => {
    const distance = positionRef.current.distanceTo(
      new Vector3(characterPosition.x, BOUNDS.CHARACTER_Y, characterPosition.z)
    )
    
    if (distance <= BALL_CONFIG.PICKUP_DISTANCE) {
      characterPositionRef.current = characterPosition
      setIsHeld(prev => !prev)
      if (!isHeld) {
        velocityRef.current.set(0, 0, 0)
      }
      return true
    }
    return false
  }, [isHeld])

  const handleKick = useCallback((characterPosition, direction) => {
    if (!isHeld) {
      const kickDirection = direction.clone().normalize()
      velocityRef.current.copy(kickDirection.multiplyScalar(BALL_CONFIG.KICK_FORCE))
      velocityRef.current.y = BALL_CONFIG.KICK_FORCE * 0.5
    }
  }, [isHeld])

  const updateCharacterPosition = useCallback((characterPosition) => {
    if (isHeld) {
      characterPositionRef.current = characterPosition
    }
  }, [isHeld])

  useImperativeHandle(ref, () => ({
    pickup: handlePickup,
    kick: handleKick,
    updateCharacterPosition
  }), [handlePickup, handleKick, updateCharacterPosition])

  useFrame((state, delta) => {
    if (!ballRef.current) return

    if (isHeld && characterPositionRef.current) {
      const targetPosition = new Vector3(
        characterPositionRef.current.x,
        BOUNDS.CHARACTER_Y + BALL_CONFIG.HOVER_HEIGHT,
        characterPositionRef.current.z + 0.5
      )
      positionRef.current.lerp(targetPosition, 0.3)
      ballRef.current.position.copy(positionRef.current)
      return
    }

    // Physics simulation when not held
    const newVelocity = velocityRef.current.clone()
    const newPosition = positionRef.current.clone()

    // Apply gravity if ball is above ground
    if (positionRef.current.y > BALL_CONFIG.RADIUS) {
      newVelocity.y += BALL_CONFIG.GRAVITY * delta
    }

    // Apply friction
    newVelocity.multiplyScalar(BALL_CONFIG.FRICTION)

    // Update position
    newPosition.add(newVelocity.clone().multiplyScalar(delta))

    // Ground collision
    if (newPosition.y < BALL_CONFIG.RADIUS) {
      newPosition.y = BALL_CONFIG.RADIUS
      newVelocity.y = -newVelocity.y * BALL_CONFIG.BOUNCE
    }

    // World bounds collision
    if (newPosition.x < BOUNDS.MIN_X || newPosition.x > BOUNDS.MAX_X) {
      newVelocity.x = -newVelocity.x * BALL_CONFIG.BOUNCE
      newPosition.x = Math.max(BOUNDS.MIN_X, Math.min(BOUNDS.MAX_X, newPosition.x))
    }
    if (newPosition.z < BOUNDS.MIN_Z || newPosition.z > BOUNDS.MAX_Z) {
      newVelocity.z = -newVelocity.z * BALL_CONFIG.BOUNCE
      newPosition.z = Math.max(BOUNDS.MIN_Z, Math.min(BOUNDS.MAX_Z, newPosition.z))
    }

    velocityRef.current.copy(newVelocity)
    positionRef.current.copy(newPosition)
    ballRef.current.position.copy(newPosition)

    // Add spin effect based on movement
    if (velocityRef.current.length() > 0.01) {
      ballRef.current.rotation.x += velocityRef.current.z * delta * 2
      ballRef.current.rotation.z -= velocityRef.current.x * delta * 2
    }
  })

  return (
    <Sphere
      ref={ballRef}
      args={[BALL_CONFIG.RADIUS, BALL_CONFIG.SEGMENTS, BALL_CONFIG.SEGMENTS]}
      position={positionRef.current.toArray()}
    >
      <meshStandardMaterial
        color="#ff4040"
        roughness={0.3}
        metalness={0.2}
      />
    </Sphere>
  )
}) 