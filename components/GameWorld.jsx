"use client";

import { useState, useEffect, useRef } from "react";
import { Vector3, Color } from "three";
import { Floor } from "./Floor";
import { Walls } from "./Walls";
import { Furniture } from "./Furniture";
import { TableItems } from "./TableItems";
import { Character } from "./Character";
import { NPCCharacter } from "./NPCCharacter";
import { InteractiveSword } from "./InteractiveSword";
import { Ball } from "./Ball";
import { useBallInteraction } from "../hooks/useBallInteraction";
import { Environment, SpotLight, DirectionalLight, AmbientLight } from "@react-three/drei";
import {
  INITIAL_PLAYER_POSITION,
  CHAT_TIMEOUT,
  DEFAULT_CHAT_OPTIONS,
  CHAT_RESPONSES,
} from "../constants/world";

export function GameWorld({ onWorldReady, playerData }) {
  const [playerPosition, setPlayerPosition] = useState(
    new Vector3(...INITIAL_PLAYER_POSITION)
  );
  const [playerRotation, setPlayerRotation] = useState(0);
  const [chatting, setChatting] = useState(false);
  const [chatOptions, setChatOptions] = useState([]);
  const [npcResponse, setNpcResponse] = useState("");
  const [hasSword, setHasSword] = useState(false);
  const ballRef = useRef(null);

  // Ball interaction state
  const { isInteracting, interactionType } = useBallInteraction({
    characterPosition: { ...playerPosition, rotation: playerRotation },
    onInteractionStart: (type, direction) => {
      if (ballRef.current) {
        if (type === 'pickup') {
          ballRef.current.pickup(playerPosition);
        } else if (type === 'kick') {
          ballRef.current.kick(playerPosition, direction);
        }
      }
    }
  });

  useEffect(() => {
    // Notify parent that GameWorld is mounted and ready
    onWorldReady?.();
  }, [onWorldReady]);

  const handleStartChat = () => {
    setChatting(true);
    setChatOptions(DEFAULT_CHAT_OPTIONS);
  };

  const handleChatOption = (option) => {
    const response = CHAT_RESPONSES[option] || CHAT_RESPONSES.DEFAULT;
    setNpcResponse(response);

    // Reset chat after a few seconds
    setTimeout(() => {
      setNpcResponse("");
      setChatting(false);
    }, CHAT_TIMEOUT);
  };

  const handleSwordPickup = () => {
    setHasSword(true);
    console.log("Sword picked up!");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (chatting && e.key >= "1" && e.key <= "3") {
        const optionIndex = Number.parseInt(e.key) - 1;
        if (optionIndex >= 0 && optionIndex < chatOptions.length) {
          handleChatOption(chatOptions[optionIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chatting, chatOptions]);

  // Update ball position when character moves
  useEffect(() => {
    if (ballRef.current) {
      ballRef.current.updateCharacterPosition({ ...playerPosition, rotation: playerRotation });
    }
  }, [playerPosition, playerRotation]);

  return (
    <>
      {/* Enhanced Lighting Setup */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight 
        position={[-10, 10, -10]} 
        intensity={0.5} 
        castShadow
      />
      <spotLight
        position={[0, 10, 0]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={0.8}
        castShadow
      />
      
      {/* Environment adds ambient lighting and reflections */}
      <Environment preset="warehouse" />

      <Floor />

      {!hasSword && (
        <InteractiveSword
          position={[5, 0, 5]}
          name="Katana"
          texturePath="/swords/katana.png"
          onPickup={handleSwordPickup}
        />
      )}

      <Ball
        position={[3, 0.3, 3]}
        ref={ballRef}
      />

      <Character
        position={playerPosition}
        setPosition={setPlayerPosition}
        name={playerData?.name}
        hasSword={hasSword}
        onRotationChange={setPlayerRotation}
      />
      <NPCCharacter
        playerPosition={playerPosition}
        onInteract={handleStartChat}
        chatting={chatting}
        chatOptions={chatOptions}
        response={npcResponse}
      />
    </>
  );
}
