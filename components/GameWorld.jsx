"use client"

import { useState, useEffect } from "react"
import { Vector3 } from "three"
import { Floor } from "./Floor"
import { Walls } from "./Walls"
import { Furniture } from "./Furniture"
import { TableItems } from "./TableItems"
import { Character } from "./Character"
import { NPCCharacter } from "./NPCCharacter"

export function GameWorld() {
  const [playerPosition, setPlayerPosition] = useState(new Vector3(0, 0, 5))
  const [chatting, setChatting] = useState(false)
  const [chatOptions, setChatOptions] = useState([])
  const [npcResponse, setNpcResponse] = useState("")

  const handleStartChat = () => {
    setChatting(true)
    setChatOptions(
      ["How are you today?", "What do you like to do for fun?", "Nice weather we're having!"]
    )
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