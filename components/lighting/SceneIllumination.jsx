import { LIGHTING } from "../../constants/world";

export const SceneIllumination = () => {
  return (
    <>
      <ambientLight intensity={LIGHTING.AMBIENT_INTENSITY} />
      <directionalLight
        position={LIGHTING.DIRECTIONAL_LIGHT.POSITION}
        intensity={LIGHTING.DIRECTIONAL_LIGHT.INTENSITY}
        castShadow
        shadow-mapSize-width={LIGHTING.DIRECTIONAL_LIGHT.SHADOW_MAP_SIZE}
        shadow-mapSize-height={LIGHTING.DIRECTIONAL_LIGHT.SHADOW_MAP_SIZE}
      />
    </>
  );
}; 