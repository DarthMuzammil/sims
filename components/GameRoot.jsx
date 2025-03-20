"use client"

import { GameCanvas } from "./canvas/GameCanvas"
import { GameContainer } from "./layout/GameContainer"
import { ControlsOverlay } from "./ui/ControlsOverlay"
import { FloorProvider } from "@/contexts/FloorContext"
import { FloorExtender } from "./ui/FloorExtender"

export default function GameRoot() {
  return (
    <FloorProvider>
      <GameContainer>
        <GameCanvas />
        <div className="fixed inset-0 pointer-events-none">
          <div className="pointer-events-auto">
            <FloorExtender />
          </div>
        </div>
      </GameContainer>
    </FloorProvider>
  );
} 