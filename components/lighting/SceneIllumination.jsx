import { LIGHTING } from "../../constants/world";
import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export const SceneIllumination = () => {
  const mainLightRef = useRef();
  const fillLightRef = useRef();
  const rimLightRef = useRef();

  // Uncomment for debugging lights
  // useHelper(mainLightRef, THREE.DirectionalLightHelper, 1, "red");
  // useHelper(fillLightRef, THREE.DirectionalLightHelper, 1, "blue");
  // useHelper(rimLightRef, THREE.DirectionalLightHelper, 1, "green");

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} color="#fdfbd3" />
      
      {/* Hemisphere light for sky/ground ambient */}
      <hemisphereLight
        skyColor="#b1e1ff"
        groundColor="#3f2f1f"
        intensity={0.5}
      />

      {/* Main key light */}
      <directionalLight
        ref={mainLightRef}
        position={[4, 8, 4]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
        shadow-radius={2}
        shadow-blurSamples={8}
        color="#ffecd6"
      />

      {/* Fill light */}
      <directionalLight
        ref={fillLightRef}
        position={[-4, 3, -2]}
        intensity={0.4}
        color="#b6ceff"
      />

      {/* Rim/back light */}
      <directionalLight
        ref={rimLightRef}
        position={[-2, 5, -4]}
        intensity={0.6}
        color="#fff5e6"
      />

      {/* Subtle ground bounce */}
      <directionalLight
        position={[0, -5, 2]}
        intensity={0.15}
        color="#ffffff"
      />

      {/* Spot lights for character emphasis */}
      <spotLight
        position={[0, 8, 0]}
        angle={0.5}
        penumbra={0.8}
        intensity={0.5}
        color="#ffffff"
        distance={20}
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Add point light for character emphasis */}
      <pointLight
        position={[0, 4, 0]}
        intensity={0.4}
        color="#ffffff"
        distance={10}
        decay={2}
      />
    </>
  );
}; 