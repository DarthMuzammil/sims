import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { CAMERA } from "../../constants/world";
import { SceneIllumination } from "../lighting/SceneIllumination";
import { SceneCameraControls } from "../camera/SceneCameraControls";
import { GameWorld } from "../GameWorld";
import { SCREENS } from "@/constants/screens";

export const GameCanvas = () => {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.SPLASH.id);
  const [isWorldReady, setIsWorldReady] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  // Generic handler for screen progression
  const handleScreenProgress = useCallback((screenId, data) => {
    const screen = SCREENS[screenId];
    if (screen?.next) {
      // Save any data passed from the screen
      if (data) {
        if (screenId === 'CHARACTER_CREATION') {
          setPlayerData(data);
        }
        // Add more data handling for other screens as needed
      }
      setCurrentScreen(screen.next);
    }
  }, []);

  // Handle world ready state
  const handleWorldReady = useCallback(() => {
    setIsWorldReady(true);
    console.log("GameWorld is ready!");
  }, []);

  // Render current screen based on screen ID
  const renderScreen = () => {
    const screen = SCREENS[currentScreen];
    
    // If screen has a component, render it
    if (screen?.component) {
      const ScreenComponent = screen.component;
      return <ScreenComponent 
        onComplete={(data) => handleScreenProgress(screen.id, data)}
        playerData={playerData}
      />;
    }

    return null;
  };

  return (
    <>
      {renderScreen()}
      <Canvas
        shadows
        camera={{
          position: CAMERA.POSITION,
          fov: CAMERA.FOV,
        }}
      >
        <SceneIllumination />
        <GameWorld onWorldReady={handleWorldReady} playerData={playerData} />
        <SceneCameraControls />
      </Canvas>
    </>
  );
};
