export const CAMERA = {
  POSITION: [10, 10, 10],
  FOV: 50,
  MAX_POLAR_ANGLE: Math.PI / 2
}

export const LIGHTING = {
  AMBIENT_INTENSITY: 0.5,
  DIRECTIONAL_LIGHT: {
    POSITION: [10, 10, 5],
    INTENSITY: 1,
    SHADOW_MAP_SIZE: 2048
  }
}

export const INITIAL_PLAYER_POSITION = [0, 0, 5]

export const CHAT_TIMEOUT = 5000 // 5 seconds

export const DEFAULT_CHAT_OPTIONS = [
  "How are you today?",
  "What do you like to do for fun?",
  "Nice weather we're having!"
]

export const CHAT_RESPONSES = {
  "How are you today?": "I'm doing great, thanks for asking!",
  "What do you like to do for fun?": "I enjoy reading and gardening!",
  "Nice weather we're having!": "Yes, perfect day for a picnic!",
  "DEFAULT": "That's interesting!"
}
