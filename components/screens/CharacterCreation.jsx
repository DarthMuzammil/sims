'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SCREEN_TRANSITIONS } from '@/constants/screens'
import { useGameAudio } from '@/contexts/AudioContext'

const AVATARS = [
  { id: 1, src: '/Avatar1.png', alt: 'Avatar 1' },
  { id: 2, src: '/Avatar2.png', alt: 'Avatar 2' },
  { id: 3, src: '/Avatar3.png', alt: 'Avatar 3' },
]

export default function CharacterCreation({ onComplete }) {
  const [characterName, setCharacterName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(1)
  const [isHovered, setIsHovered] = useState(null)
  
  const { volume, setVolume, audioReady, setAudioReady, audioControls } = useGameAudio();

  // Effect to handle initial audio play and user interaction
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleFirstInteraction = async () => {
      if (!audioReady) {
        console.log('Attempting to play audio after user interaction...');
        const success = await audioControls.play();
        if (success) {
          console.log('Audio playing successfully after user interaction');
          setAudioReady(true);
        }
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [audioControls, audioReady, setAudioReady]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (characterName.trim()) {
      onComplete?.({
        name: characterName,
        avatar: selectedAvatar
      })
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="character-creation"
        variants={SCREEN_TRANSITIONS.FADE}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1b1e]"
      >
        <div className="w-full max-w-md p-8 space-y-6 bg-[#25262b] rounded-2xl">
          <motion.h1
            variants={SCREEN_TRANSITIONS.SCALE_FADE}
            className="text-2xl font-bold text-white"
          >
            Create Your Character
          </motion.h1>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-white">
              Music Volume
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-32"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Character Name
              </label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-[#2c2e33] border-0 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Choose Avatar
              </label>
              <div className="grid grid-cols-3 gap-4">
                {AVATARS.map((avatar) => (
                  <motion.button
                    key={avatar.id}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar.id)}
                    onHoverStart={() => setIsHovered(avatar.id)}
                    onHoverEnd={() => setIsHovered(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      selectedAvatar === avatar.id
                        ? 'ring-2 ring-blue-500'
                        : 'ring-1 ring-gray-600'
                    } bg-[#2c2e33]`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={avatar.src}
                        alt={avatar.alt}
                        width={80}
                        height={80}
                        className="object-contain w-4/5 h-4/5"
                        priority
                      />
                    </div>
                    {(selectedAvatar === avatar.id || isHovered === avatar.id) && (
                      <div className="absolute inset-0 bg-[#228be6]/20 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {selectedAvatar === avatar.id ? 'Selected' : 'Select'}
                        </span>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 text-white bg-[#228be6] rounded-lg hover:bg-[#1c7ed6] transition-colors font-medium"
            >
              Create Character
            </motion.button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 