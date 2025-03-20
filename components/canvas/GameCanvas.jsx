import { Canvas } from "@react-three/fiber";
import { CAMERA } from "../../constants/world";
import { SceneIllumination } from "../lighting/SceneIllumination";
import { SceneCameraControls } from "../camera/SceneCameraControls";
import { GameWorld } from "../GameWorld";

export const GameCanvas = () => {
  return (
    <Canvas 
      shadows 
      camera={{ 
        position: CAMERA.POSITION, 
        fov: CAMERA.FOV 
      }}
    >
      <SceneIllumination />
      <GameWorld />
      <SceneCameraControls />
    </Canvas>
  );
}; 