"use client"

import { Box, useTexture } from "@react-three/drei"

export function Walls() {
  const wallTexture = useTexture("/wall.svg?height=512&width=512")

  return (<>
    {/* Back wall */}
    <Box castShadow receiveShadow position={[0, 2, -10]} args={[20, 4, 0.2]}>
      <meshStandardMaterial map={wallTexture} color="#d5c4a1" roughness={0.7} />
    </Box>
    {/* Left wall */}
    <Box castShadow receiveShadow position={[-10, 2, 0]} args={[0.2, 4, 20]}>
      <meshStandardMaterial map={wallTexture} color="#d5c4a1" roughness={0.7} />
    </Box>
    {/* Right wall */}
    <Box castShadow receiveShadow position={[10, 2, 0]} args={[0.2, 4, 20]}>
      <meshStandardMaterial map={wallTexture} color="#d5c4a1" roughness={0.7} />
    </Box>
  </>);
} 