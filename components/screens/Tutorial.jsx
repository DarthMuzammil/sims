'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SCREEN_TRANSITIONS } from '@/constants/screens'

const TUTORIAL_STEPS = [
  {
    title: 'Welcome to SentientSim',
    description: 'Learn how to navigate and interact in your new world.',
    image: '/tutorial/tutorial.gif',
    type: 'gif'
  },
  {
    title: 'Moving Around',
    description: 'Use WASD keys to move your character around the world.',
    image: '/tutorial/tutorial1.png',
    type: 'image'
  },
  {
    title: 'Interacting',
    description: 'Press E to interact with objects and NPCs in the world.',
    image: '/tutorial/tutorial2.png',
    type: 'image'
  },
  {
    title: 'Camera Control',
    description: 'Use your mouse to rotate the camera and scroll to zoom.',
    image: '/tutorial/tutorial3.png',
    type: 'image'
  }
]

export default function Tutorial({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(true)

  const handleNext = () => {
    setIsImageLoading(true)
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete?.()
    }
  }

  const handleSkip = () => {
    onComplete?.()
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="tutorial"
        variants={SCREEN_TRANSITIONS.FADE}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1b1e]"
      >
        <div className="w-full max-w-2xl p-8">
          <motion.div
            variants={SCREEN_TRANSITIONS.SCALE_FADE}
            className="bg-[#25262b] rounded-2xl p-6 space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {TUTORIAL_STEPS[currentStep].title}
              </h2>
              <span className="text-white/60">
                {currentStep + 1} / {TUTORIAL_STEPS.length}
              </span>
            </div>

            <div className="relative aspect-video bg-[#2c2e33] rounded-lg overflow-hidden">
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                </div>
              )}
              <Image
                src={TUTORIAL_STEPS[currentStep].image}
                alt={TUTORIAL_STEPS[currentStep].title}
                fill
                className="object-contain"
                priority
                onLoadingComplete={() => setIsImageLoading(false)}
                unoptimized={TUTORIAL_STEPS[currentStep].type === 'gif'}
              />
            </div>

            <p className="text-white/80 text-lg">
              {TUTORIAL_STEPS[currentStep].description}
            </p>

            <div className="flex justify-between pt-4">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-white/60 hover:text-white transition-colors"
              >
                Skip Tutorial
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-[#228be6] text-white rounded-lg hover:bg-[#1c7ed6] transition-colors"
              >
                {currentStep < TUTORIAL_STEPS.length - 1 ? 'Next' : 'Start Game'}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 