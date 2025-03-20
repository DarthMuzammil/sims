// Character dimensions
export const CHARACTER_DIMENSIONS = {
  BODY: [0.8, 1.5, 0.5],
  HEAD: [0.7, 0.7, 0.7],
  ARMS: [0.25, 1, 0.25],
  LEGS: [0.3, 0.8, 0.3],
  FEATURES: [0.1, 0.1, 0.1],
  MOUTH: [0.3, 0.05, 0.1]
}

// Character colors
export const CHARACTER_COLORS = {
    PLAYER: {
      BODY: "#FFD700",         // Bright yellow for the main body
      HEAD: "#D3687C",         // Muted rose → skin/head contrast and warmth
      LEGS: "#DAA520",         // Golden rod - complementing the yellow body
      EYES: "#2D2D2D",         // Deep neutral gray → softer than black, less harsh
      MOUTH: "#3C3C3C",        // Muted dark gray → low attention feature
      TEXT: "#F9F9F9",         // Near-white for better contrast
      TEXT_OUTLINE: "#1A1A1A"  // Softer black for readability
    },
    NPC: {
      BODY: "#6A5ACD",         // Muted indigo → separates NPCs visually, a calm tone
      HEAD: "#B98B82",         // Muted warm beige → neutral skin tone
      LEGS: "#4B5320",         // Dark moss green → solid, grounded
      EYES: "#2C2C2C",
      MOUTH: "#3A3A3A",
      TEXT: "#FFFFFF",
      TEXT_OUTLINE: "#000000"
    }
  }

// Material properties
export const MATERIAL_PROPERTIES = {
  BODY_ROUGHNESS: 0.6,
  HEAD_ROUGHNESS: 0.5,
  LEGS_ROUGHNESS: 0.5
} 