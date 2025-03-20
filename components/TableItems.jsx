"use client"

import { Box } from "@react-three/drei"

export function TableItems() {
  return (
    (<group>
      {/* Book on table */}
      <Box
        castShadow
        position={[-1, 1.2, 0]}
        args={[0.8, 0.1, 0.6]}
        rotation={[0, Math.PI / 12, 0]}>
        <meshStandardMaterial color="#cc241d" roughness={0.6} />
      </Box>
      {/* Coffee mug */}
      <group position={[1, 1.2, 0.5]}>
        <Box castShadow args={[0.3, 0.4, 0.3]} position={[0, 0.2, 0]}>
          <meshStandardMaterial color="#fbf1c7" roughness={0.3} />
        </Box>
        <Box castShadow args={[0.1, 0.2, 0.1]} position={[0.25, 0.2, 0]}>
          <meshStandardMaterial color="#fbf1c7" roughness={0.3} />
        </Box>
        <Box castShadow args={[0.25, 0.05, 0.25]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#504945" roughness={0.5} />
        </Box>
      </group>
      {/* Plate with food */}
      <group position={[0.5, 1.2, -0.5]}>
        <Box castShadow args={[0.8, 0.05, 0.8]} position={[0, 0, 0]} radius={0.4}>
          <meshStandardMaterial color="white" roughness={0.2} />
        </Box>
        <Box castShadow args={[0.3, 0.1, 0.3]} position={[0, 0.08, 0]}>
          <meshStandardMaterial color="#b8bb26" roughness={0.6} />
        </Box>
        <Box castShadow args={[0.2, 0.15, 0.2]} position={[0.2, 0.1, 0.2]}>
          <meshStandardMaterial color="#fb4934" roughness={0.6} />
        </Box>
      </group>
      {/* Laptop */}
      <group position={[-0.5, 1.2, -0.5]}>
        <Box castShadow args={[1, 0.05, 0.7]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#504945" roughness={0.3} />
        </Box>
        <Box
          castShadow
          args={[1, 0.7, 0.05]}
          position={[0, 0.35, -0.35]}
          rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial color="#504945" roughness={0.3} />
        </Box>
        <Box
          castShadow
          args={[0.9, 0.6, 0.01]}
          position={[0, 0.38, -0.35]}
          rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial
            color="#282828"
            emissive="#83a598"
            emissiveIntensity={0.2}
            roughness={0.1} />
        </Box>
      </group>
    </group>)
  );
} 