'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Automatically hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        when: "afterChildren"
      }
    }
  }

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="splash-screen"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              variants={logoVariants}
              className="relative w-24 h-24"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
              <Image
                src="/loading-spinner.svg"
                alt="SentientSim Logo"
                width={96}
                height={96}
                className="relative z-10 animate-spin"
                priority
              />
            </motion.div>

            <motion.h1
              variants={textVariants}
              className="text-4xl font-bold text-white tracking-wider"
            >
              SentientSim
            </motion.h1>

            <motion.div
              variants={textVariants}
              className="flex items-center gap-2"
            >
              <div className="h-1 w-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="h-1 w-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="h-1 w-1 bg-blue-500 rounded-full animate-bounce" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 