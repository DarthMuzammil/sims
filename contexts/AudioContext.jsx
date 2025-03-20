'use client'

import { createContext, useContext, useState } from 'react';
import { useAudio } from '@/hooks/useAudio';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [volume, setVolume] = useState(0.3);
  const [audioReady, setAudioReady] = useState(false);

  const audioControls = useAudio('/background.mp3', {
    autoPlay: true,
    loop: true,
    volume: volume
  });

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    audioControls.setVolume(newVolume);
  };

  const value = {
    volume,
    setVolume: handleVolumeChange,
    audioReady,
    setAudioReady,
    audioControls
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useGameAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useGameAudio must be used within an AudioProvider');
  }
  return context;
} 