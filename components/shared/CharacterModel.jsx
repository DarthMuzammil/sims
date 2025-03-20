import { Box } from "@react-three/drei"
import { CHARACTER_DIMENSIONS, CHARACTER_COLORS, MATERIAL_PROPERTIES } from "../../constants/character"

export function CharacterModel({ 
  colors = CHARACTER_COLORS.PLAYER, 
  dimensions = CHARACTER_DIMENSIONS,
  materials = MATERIAL_PROPERTIES 
}) {
  return (
    <>
      {/* Character body */}
      <Box castShadow args={dimensions.BODY} position={[0, 0.75, 0]}>
        <meshStandardMaterial color={colors.BODY} roughness={materials.BODY_ROUGHNESS} />
      </Box>
      {/* Character head */}
      <Box castShadow args={dimensions.HEAD} position={[0, 1.85, 0]}>
        <meshStandardMaterial color={colors.HEAD} roughness={materials.HEAD_ROUGHNESS} />
      </Box>
      {/* Character arms */}
      <Box castShadow args={dimensions.ARMS} position={[0.6, 0.75, 0]}>
        <meshStandardMaterial color={colors.BODY} roughness={materials.BODY_ROUGHNESS} />
      </Box>
      <Box castShadow args={dimensions.ARMS} position={[-0.6, 0.75, 0]}>
        <meshStandardMaterial color={colors.BODY} roughness={materials.BODY_ROUGHNESS} />
      </Box>
      {/* Character legs */}
      <Box castShadow args={dimensions.LEGS} position={[0.2, 0, 0]}>
        <meshStandardMaterial color={colors.LEGS} roughness={materials.LEGS_ROUGHNESS} />
      </Box>
      <Box castShadow args={dimensions.LEGS} position={[-0.2, 0, 0]}>
        <meshStandardMaterial color={colors.LEGS} roughness={materials.LEGS_ROUGHNESS} />
      </Box>
      {/* Character eyes */}
      <Box args={dimensions.FEATURES} position={[0.2, 1.9, 0.35]}>
        <meshBasicMaterial color={colors.EYES} />
      </Box>
      <Box args={dimensions.FEATURES} position={[-0.2, 1.9, 0.35]}>
        <meshBasicMaterial color={colors.EYES} />
      </Box>
      {/* Character mouth */}
      <Box args={dimensions.MOUTH} position={[0, 1.7, 0.35]}>
        <meshBasicMaterial color={colors.MOUTH} />
      </Box>
    </>
  )
} 