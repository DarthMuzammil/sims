"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Box, Plane, useTexture } from "@react-three/drei"
import { Vector3 } from "three"
import ChatInterface from "./app/components/ChatInterface"

export default function SimsGame() {
  const [showChat, setShowChat] = useState(false);
  
  return (
    (<div className="w-full h-screen">
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048} />
        <GameWorld onStartChat={() => setShowChat(true)} />
        <OrbitControls target={[0, 0, 0]} maxPolarAngle={Math.PI / 2} />
      </Canvas>
      <div
        className="absolute bottom-4 left-4 bg-black/70 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Controls:</h2>
        <p>WASD - Move character</p>
        <p>E - Interact with objects/NPCs</p>
        <p>1-3 - Select chat options (when chatting)</p>
        <p>Mouse - Rotate camera</p>
      </div>
      {showChat && <ChatInterface />}
    </div>)
  );
}

function GameWorld({ onStartChat }) {
  const [playerPosition, setPlayerPosition] = useState(new Vector3(0, 0, 5))
  const [chatting, setChatting] = useState(false)
  const [chatOptions, setChatOptions] = useState([])
  const [npcResponse, setNpcResponse] = useState("")

  const handleStartChat = () => {
    setChatting(true)
    setChatOptions(
      ["How are you today?", "What do you like to do for fun?", "Nice weather we're having!"]
    )
    onStartChat()
  }

  const handleChatOption = (option) => {
    let response = ""
    switch (option) {
      case "How are you today?":
        response = "I'm doing great, thanks for asking!"
        break
      case "What do you like to do for fun?":
        response = "I enjoy reading and gardening!"
        break
      case "Nice weather we're having!":
        response = "Yes, perfect day for a picnic!"
        break
      default:
        response = "That's interesting!"
    }
    setNpcResponse(response)

    // Reset chat after a few seconds
    setTimeout(() => {
      setNpcResponse("")
      setChatting(false)
    }, 5000)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (chatting && e.key >= "1" && e.key <= "3") {
        const optionIndex = Number.parseInt(e.key) - 1
        if (optionIndex >= 0 && optionIndex < chatOptions.length) {
          handleChatOption(chatOptions[optionIndex])
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chatting, chatOptions])

  return (<>
    <Floor />
    <Walls />
    <Furniture />
    <TableItems />
    <Character position={playerPosition} setPosition={setPlayerPosition} />
    <NPCCharacter
      playerPosition={playerPosition}
      onInteract={handleStartChat}
      chatting={chatting}
      chatOptions={chatOptions}
      response={npcResponse} />
  </>);
}

function Floor() {
  const texture = useTexture("/floor.svg?height=512&width=512")

  return (
    (<Plane
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      args={[20, 20]}>
      <meshStandardMaterial map={texture} color="#a9b665" roughness={0.8} />
    </Plane>)
  );
}

function Walls() {
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

function Furniture() {
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

function TableItems() {
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

function InteractiveObject({ position, name }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    (<group position={position}>
      {isHovered && (
        <Text
          position={[0, 1, 0]}
          color="white"
          fontSize={0.5}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000">
          {name}
        </Text>
      )}
      <mesh
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        onClick={() => console.log(`Interacting with ${name}`)}
        visible={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>)
  );
}

function Character({ position, setPosition }) {
  const characterRef = useRef()
  const [targetPosition, setTargetPosition] = useState(new Vector3(position.x, position.y, position.z))
  const [isMoving, setIsMoving] = useState(false)
  const moveSpeed = 0.05

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newTarget = targetPosition.clone()

      switch (e.key.toLowerCase()) {
        case "w":
          newTarget.z -= 0.5
          break
        case "s":
          newTarget.z += 0.5
          break
        case "a":
          newTarget.x -= 0.5
          break
        case "d":
          newTarget.x += 0.5
          break
        case "e":
          console.log("Trying to interact with nearby objects")
          break
        default:
          return
      }

      // Limit movement within bounds
      newTarget.x = Math.max(-9, Math.min(9, newTarget.x))
      newTarget.z = Math.max(-9, Math.min(9, newTarget.z))

      setTargetPosition(newTarget)
      setIsMoving(true)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [targetPosition])

  useFrame(() => {
    if (position.distanceTo(targetPosition) > 0.1) {
      const newPos = position.clone().lerp(targetPosition, moveSpeed)
      setPosition(newPos)

      // Update character rotation to face movement direction
      if (characterRef.current) {
        const direction = new Vector3().subVectors(targetPosition, position)
        if (direction.length() > 0.1) {
          const angle = Math.atan2(direction.x, direction.z)
          characterRef.current.rotation.y = angle
        }
      }
    } else if (isMoving) {
      setIsMoving(false)
    }
  })

  return (
    (<group ref={characterRef} position={[position.x, 1, position.z]}>
      {/* Character body */}
      <Box castShadow args={[0.8, 1.5, 0.5]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#b8bb26" roughness={0.6} />
      </Box>
      {/* Character head */}
      <Box castShadow args={[0.7, 0.7, 0.7]} position={[0, 1.85, 0]}>
        <meshStandardMaterial color="#fabd2f" roughness={0.5} />
      </Box>
      {/* Character arms */}
      <Box castShadow args={[0.25, 1, 0.25]} position={[0.6, 0.75, 0]}>
        <meshStandardMaterial color="#b8bb26" roughness={0.6} />
      </Box>
      <Box castShadow args={[0.25, 1, 0.25]} position={[-0.6, 0.75, 0]}>
        <meshStandardMaterial color="#b8bb26" roughness={0.6} />
      </Box>
      {/* Character legs */}
      <Box castShadow args={[0.3, 0.8, 0.3]} position={[0.2, 0, 0]}>
        <meshStandardMaterial color="#458588" roughness={0.5} />
      </Box>
      <Box castShadow args={[0.3, 0.8, 0.3]} position={[-0.2, 0, 0]}>
        <meshStandardMaterial color="#458588" roughness={0.5} />
      </Box>
      {/* Character eyes */}
      <Box args={[0.1, 0.1, 0.1]} position={[0.2, 1.9, 0.35]}>
        <meshBasicMaterial color="black" />
      </Box>
      <Box args={[0.1, 0.1, 0.1]} position={[-0.2, 1.9, 0.35]}>
        <meshBasicMaterial color="black" />
      </Box>
      {/* Character mouth */}
      <Box args={[0.3, 0.05, 0.1]} position={[0, 1.7, 0.35]}>
        <meshBasicMaterial color="black" />
      </Box>
      {/* Status indicator */}
      <Text
        position={[0, 2.5, 0]}
        color="white"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000">
        {isMoving ? "Walking" : "Idle"}
      </Text>
    </group>)
  );
}

function NPCCharacter({ playerPosition, onInteract, chatting, chatOptions, response, name = "NPC" }) {
  const position = new Vector3(0, 0, 0)
  const ref = useRef()
  const useChatStore = require('./app/store/chatStore').default
  const setCurrentCharacter = useChatStore(state => state.setCurrentCharacter)
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "e") {
        const distance = position.distanceTo(playerPosition)
        if (distance < 3) {
          setCurrentCharacter(name)
          onInteract()
        }
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [playerPosition, onInteract, name, setCurrentCharacter])

  useFrame(() => {
    // Make NPC face the player
    if (ref.current) {
      const direction = new Vector3().subVectors(playerPosition, position)
      if (direction.length() > 0.1) {
        const angle = Math.atan2(direction.x, direction.z)
        ref.current.rotation.y = angle
      }
    }
  })

  return (
    (<group ref={ref} position={[position.x, 1, position.z]}>
      {/* NPC body - different color from player */}
      <Box castShadow args={[0.8, 1.5, 0.5]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#d3869b" roughness={0.6} />
      </Box>
      {/* NPC head */}
      <Box castShadow args={[0.7, 0.7, 0.7]} position={[0, 1.85, 0]}>
        <meshStandardMaterial color="#d79921" roughness={0.5} />
      </Box>
      {/* NPC arms */}
      <Box castShadow args={[0.25, 1, 0.25]} position={[0.6, 0.75, 0]}>
        <meshStandardMaterial color="#d3869b" roughness={0.6} />
      </Box>
      <Box castShadow args={[0.25, 1, 0.25]} position={[-0.6, 0.75, 0]}>
        <meshStandardMaterial color="#d3869b" roughness={0.6} />
      </Box>
      {/* NPC legs */}
      <Box castShadow args={[0.3, 0.8, 0.3]} position={[0.2, 0, 0]}>
        <meshStandardMaterial color="#689d6a" roughness={0.5} />
      </Box>
      <Box castShadow args={[0.3, 0.8, 0.3]} position={[-0.2, 0, 0]}>
        <meshStandardMaterial color="#689d6a" roughness={0.5} />
      </Box>
      {/* NPC eyes */}
      <Box args={[0.1, 0.1, 0.1]} position={[0.2, 1.9, 0.35]}>
        <meshBasicMaterial color="black" />
      </Box>
      <Box args={[0.1, 0.1, 0.1]} position={[-0.2, 1.9, 0.35]}>
        <meshBasicMaterial color="black" />
      </Box>
      {/* NPC mouth */}
      <Box args={[0.3, 0.05, 0.1]} position={[0, 1.7, 0.35]}>
        <meshBasicMaterial color="black" />
      </Box>
      {/* Interaction indicator */}
      {position.distanceTo(playerPosition) < 3 && !chatting && (
        <group position={[0, 2.8, 0]}>
          <Text
            position={[0, 0, 0]}
            color="white"
            fontSize={0.3}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#000000">
            Press E to chat
          </Text>
        </group>
      )}
      {/* Chat options */}
      {chatting && !response && (
        <group position={[0, 3, 0]}>
          <Box args={[4, 2, 0.1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#282828" opacity={0.8} transparent />
          </Box>
          {chatOptions.map((option, index) => (
            <Text
              key={index}
              position={[0, 0.5 - index * 0.5, 0.1]}
              color="white"
              fontSize={0.25}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
              maxWidth={3.5}>
              {`${index + 1}. ${option}`}
            </Text>
          ))}
        </group>
      )}
      {/* NPC response */}
      {response && (
        <group position={[0, 3, 0]}>
          <Box args={[4, 1, 0.1]} position={[0, 0, 0]} radius={0.2}>
            <meshStandardMaterial color="#fbf1c7" opacity={0.9} transparent />
          </Box>
          <Text
            position={[0, 0, 0.1]}
            color="#282828"
            fontSize={0.25}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#fbf1c7"
            maxWidth={3.5}>
            {response}
          </Text>
        </group>
      )}
    </group>)
  );
}

