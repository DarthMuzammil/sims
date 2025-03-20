"use client"

import { Box, useTexture } from "@react-three/drei"
import { InteractiveObject } from "./InteractiveObject"

export function Furniture() {
  const woodTexture = useTexture("/wood.svg?height=512&width=512")
  const fabricTexture = useTexture("/fabric.svg?height=512&width=512")

  return (<>
    {/* Bed */}
    <Box castShadow receiveShadow position={[-7, 0.5, -7]} args={[4, 1, 6]}>
      <meshStandardMaterial map={woodTexture} color="#fe8019" roughness={0.6} />
    </Box>
    <Box castShadow receiveShadow position={[-7, 1, -9]} args={[4, 1, 2]}>
      <meshStandardMaterial map={fabricTexture} color="#d3869b" roughness={0.3} />
    </Box>
    {/* Table */}
    <Box castShadow receiveShadow position={[0, 1, 0]} args={[4, 0.2, 3]}>
      <meshStandardMaterial map={woodTexture} color="#a89984" roughness={0.5} />
    </Box>
    {/* Chair 1 */}
    <Box castShadow receiveShadow position={[0, 0.5, 2]} args={[1.5, 1, 1]}>
      <meshStandardMaterial map={fabricTexture} color="#83a598" roughness={0.4} />
    </Box>
    <Box castShadow receiveShadow position={[0, 1.5, 2.5]} args={[1.5, 1, 0.2]}>
      <meshStandardMaterial map={fabricTexture} color="#83a598" roughness={0.4} />
    </Box>
    {/* Chair 2 */}
    <Box castShadow receiveShadow position={[0, 0.5, -2]} args={[1.5, 1, 1]}>
      <meshStandardMaterial map={fabricTexture} color="#83a598" roughness={0.4} />
    </Box>
    <Box castShadow receiveShadow position={[0, 1.5, -2.5]} args={[1.5, 1, 0.2]}>
      <meshStandardMaterial map={fabricTexture} color="#83a598" roughness={0.4} />
    </Box>
    {/* TV */}
    <Box castShadow receiveShadow position={[7, 1, 0]} args={[0.5, 2, 4]}>
      <meshStandardMaterial color="#282828" roughness={0.2} />
    </Box>
    <Box castShadow receiveShadow position={[6.7, 1, 0]} args={[0.1, 1.5, 3]}>
      <meshStandardMaterial
        color="#3c3836"
        emissive="#504945"
        emissiveIntensity={0.5}
        roughness={0.1} />
    </Box>
    {/* Interactive objects with labels */}
    <InteractiveObject position={[0, 1.2, 0]} name="Table" />
    <InteractiveObject position={[-7, 1.5, -7]} name="Bed" />
    <InteractiveObject position={[6.7, 1, 0]} name="TV" />
  </>);
} 