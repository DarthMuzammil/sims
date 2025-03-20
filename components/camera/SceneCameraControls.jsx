import { OrbitControls } from "@react-three/drei";
import { CAMERA } from "../../constants/world";

export const SceneCameraControls = () => {
  return (
    <OrbitControls 
      target={[0, 0, 0]} 
      maxPolarAngle={CAMERA.MAX_POLAR_ANGLE} 
    />
  );
}; 