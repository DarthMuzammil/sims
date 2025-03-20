"use client"

import { useFloor } from "@/contexts/FloorContext"

export function FloorExtender() {
  const { extendFloor } = useFloor()

  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-black/20 p-4 rounded-lg backdrop-blur-sm">
      <div className="text-white text-sm font-semibold mb-2">Extend Floor</div>
      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={() => extendFloor('west')}
          className="bg-blue-500/80 hover:bg-blue-600/80 text-white p-2 rounded transition-colors">
          ←
        </button>
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => extendFloor('north')}
            className="bg-blue-500/80 hover:bg-blue-600/80 text-white p-2 rounded transition-colors">
            ↑
          </button>
          <button 
            onClick={() => extendFloor('south')}
            className="bg-blue-500/80 hover:bg-blue-600/80 text-white p-2 rounded transition-colors">
            ↓
          </button>
        </div>
        <button 
          onClick={() => extendFloor('east')}
          className="bg-blue-500/80 hover:bg-blue-600/80 text-white p-2 rounded transition-colors">
          →
        </button>
      </div>
    </div>
  )
} 