"use client"

import { useState, useEffect } from "react"
import { Vector3 } from "three"
import { Floor } from "./Floor"
import { Walls } from "./Walls"
import { Furniture } from "./Furniture"
import { TableItems } from "./TableItems"
import { Character } from "./Character"
import { NPCCharacter } from "./NPCCharacter"
import { INITIAL_PLAYER_POSITION, CHAT_TIMEOUT, DEFAULT_CHAT_OPTIONS, CHAT_RESPONSES } from "../constants/world"

export function GameWorld({ onWorldReady }) {
  const [playerPosition, setPlayerPosition] = useState(new Vector3(...INITIAL_PLAYER_POSITION))
  const [chatting, setChatting] = useState(false)
  const [chatOptions, setChatOptions] = useState([])
  const [npcResponse, setNpcResponse] = useState("")

  useEffect(() => {
    // Notify parent that GameWorld is mounted and ready
    onWorldReady?.()
  }, [onWorldReady])

  const handleStartChat = () => {
    setChatting(true)
    setChatOptions(DEFAULT_CHAT_OPTIONS)
  }

  const handleChatOption = (option) => {
    const response = CHAT_RESPONSES[option] || CHAT_RESPONSES.DEFAULT
    setNpcResponse(response)

    // Reset chat after a few seconds
    setTimeout(() => {
      setNpcResponse("")
      setChatting(false)
    }, CHAT_TIMEOUT)
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

  return (
    <>
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
    </>
  );
} 