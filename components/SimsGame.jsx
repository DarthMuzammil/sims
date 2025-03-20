"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { GameWorld } from "./GameWorld"

export default function SimsGame() {
  return (
    (<div className="w-full h-screen">
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048} />
        <GameWorld />
        <OrbitControls target={[0, 0, 0]} maxPolarAngle={Math.PI / 2} />
      </Canvas>
      <div
        className="absolute bottom-4 left-4 bg-black/70 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Controls:</h2>
        <p>WASD - Move character</p>
        <p>E - Interact with objects/NPCs</p>
        <p>1-3 - Select chat options (when chatting)</p>
        <p>Mouse - Rotate camera</p>
      </div>
    </div>)
  );
}

