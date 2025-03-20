import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CAMERA } from "../../constants/world";
import { SceneIllumination } from "../lighting/SceneIllumination";
import { SceneCameraControls } from "../camera/SceneCameraControls";
import { GameWorld } from "../GameWorld";
import SplashScreen from "../ui/SplashScreen";

export const GameCanvas = () => {
  const [isWorldReady, setIsWorldReady] = useState(false);

  const handleWorldReady = () => {
    setIsWorldReady(true);
    console.log("GameWorld is ready!");
  };

  return (
    <>
      {!isWorldReady && <SplashScreen />}
      <Canvas
        shadows
        camera={{
          position: CAMERA.POSITION,
          fov: CAMERA.FOV,
        }}
      >
        <SceneIllumination />
        <GameWorld onWorldReady={handleWorldReady} />
        <SceneCameraControls />
      </Canvas>
    </>
  );
};
