'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="flex flex-col items-center gap-4"
      >
        <h1 className="text-3xl font-bold text-white">Loading Game World</h1>
        <Image
          src="/loading-spinner.svg"
          alt="Loading..."
          width={48}
          height={48}
          className="animate-spin"
        />
      </motion.div>
    </motion.div>
  )
} 