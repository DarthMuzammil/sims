"use client"

import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const FloorContext = createContext()

export function FloorProvider({ children }) {
  const [floorSections, setFloorSections] = useState([
    { x: 0, z: 0, size: 20 } // Initial floor section
  ])

  const extendFloor = useCallback((direction) => {
    setFloorSections(prevSections => {
      const lastSection = prevSections[prevSections.length - 1]
      let newSection

      switch(direction) {
        case 'north':
          newSection = { x: lastSection.x, z: lastSection.z - lastSection.size, size: 20 }
          break
        case 'south':
          newSection = { x: lastSection.x, z: lastSection.z + lastSection.size, size: 20 }
          break
        case 'east':
          newSection = { x: lastSection.x + lastSection.size, z: lastSection.z, size: 20 }
          break
        case 'west':
          newSection = { x: lastSection.x - lastSection.size, z: lastSection.z, size: 20 }
          break
        default:
          return prevSections
      }

      // Check if section already exists
      const exists = prevSections.some(section => 
        section.x === newSection.x && section.z === newSection.z
      )

      if (exists) return prevSections
      return [...prevSections, newSection]
    })
  }, [])

  const value = useMemo(() => ({
    floorSections,
    extendFloor
  }), [floorSections, extendFloor])

  return (
    <FloorContext.Provider value={value}>
      {children}
    </FloorContext.Provider>
  )
}

export function useFloor() {
  const context = useContext(FloorContext)
  if (!context) {
    throw new Error('useFloor must be used within a FloorProvider')
  }
  return context
} 