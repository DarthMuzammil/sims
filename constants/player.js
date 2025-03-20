import { Vector3 } from 'three'

export const MOVEMENT = {
  ACCELERATION: 0.2,
  MAX_VELOCITY: 0.07,
  FRICTION: 0.92,
  ROTATION_SPEED: 0.1,
  INTERACTION_DISTANCE: 0.1
}

export const CHARACTER_Y = 1

export const DEFAULT_BOUNDS = {
  MIN_X: -10,
  MAX_X: 10,
  MIN_Z: -10,
  MAX_Z: 10,
  CHARACTER_Y
}

export const getBounds = (floorSections) => {
  if (!floorSections?.length) return DEFAULT_BOUNDS

  let minX = Infinity
  let maxX = -Infinity
  let minZ = Infinity
  let maxZ = -Infinity

  floorSections.forEach(section => {
    const halfSize = section.size / 2
    minX = Math.min(minX, section.x - halfSize)
    maxX = Math.max(maxX, section.x + halfSize)
    minZ = Math.min(minZ, section.z - halfSize)
    maxZ = Math.max(maxZ, section.z + halfSize)
  })

  return {
    MIN_X: minX,
    MAX_X: maxX,
    MIN_Z: minZ,
    MAX_Z: maxZ,
    CHARACTER_Y
  }
}

export const CHARACTER_DIMENSIONS = {
  BODY: [0.8, 1.5, 0.5],
  HEAD: [0.7, 0.7, 0.7],
  ARMS: [0.25, 1, 0.25],
  LEGS: [0.3, 0.8, 0.3],
  FEATURES: [0.1, 0.1, 0.1],
  MOUTH: [0.3, 0.05, 0.1]
}

export const STATUS_TEXT = {
  MOVING: "Walking",
  IDLE: "Idle"
}

// Helper function to check if a position is within bounds
export const isWithinBounds = (position, bounds = DEFAULT_BOUNDS) => {
  return position.x >= bounds.MIN_X &&
         position.x <= bounds.MAX_X &&
         position.z >= bounds.MIN_Z &&
         position.z <= bounds.MAX_Z
}

// Helper function to clamp a position to bounds
export const clampToBounds = (position, bounds = DEFAULT_BOUNDS) => {
  return new Vector3(
    Math.max(bounds.MIN_X, Math.min(bounds.MAX_X, position.x)),
    position.y,
    Math.max(bounds.MIN_Z, Math.min(bounds.MAX_Z, position.z))
  )
}
