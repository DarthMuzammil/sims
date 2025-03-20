"use client"

import { GameCanvas } from "./canvas/GameCanvas"
import { GameContainer } from "./layout/GameContainer"
import { ControlsOverlay } from "./ui/ControlsOverlay"

export default function GameRoot() {
  return (
    <GameContainer>
      <GameCanvas />
      {/* <ControlsOverlay /> */}
    </GameContainer>
  );
} 