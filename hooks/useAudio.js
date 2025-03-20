import { useEffect, useRef } from 'react';

export function useAudio(audioSrc, options = {}) {
  const audioRef = useRef(null);
  const { 
    autoPlay = true, 
    loop = true, 
    volume = 0.5 
  } = options;

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(audioSrc);
    audioRef.current.loop = loop;
    audioRef.current.volume = volume;

    if (autoPlay) {
      // Create a function to handle user interaction and play audio
      const playAudio = async () => {
        try {
          // Check if audio context is suspended and resume it
          if (window.AudioContext || window.webkitAudioContext) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            if (audioContext.state === 'suspended') {
              await audioContext.resume();
            }
          }
          
          // Attempt to play the audio
          await audioRef.current.play();
          console.log('Audio playing successfully');
          
          // Remove event listeners after successful playback
          document.removeEventListener('click', playAudio);
          document.removeEventListener('keydown', playAudio);
          document.removeEventListener('touchstart', playAudio);
        } catch (error) {
          console.log('Audio playback failed:', error);
          // Keep the event listeners if playback failed
        }
      };

      // Add event listeners for various user interactions
      document.addEventListener('click', playAudio);
      document.addEventListener('keydown', playAudio);
      document.addEventListener('touchstart', playAudio);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      // Clean up event listeners
      document.removeEventListener('click', () => {});
      document.removeEventListener('keydown', () => {});
      document.removeEventListener('touchstart', () => {});
    };
  }, [audioSrc, autoPlay, loop, volume]);

  const controls = {
    play: async () => {
      try {
        await audioRef.current?.play();
        return true;
      } catch (error) {
        console.log('Manual play failed:', error);
        return false;
      }
    },
    pause: () => audioRef.current?.pause(),
    stop: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    },
    setVolume: (value) => {
      if (audioRef.current) {
        audioRef.current.volume = Math.max(0, Math.min(1, value));
      }
    }
  };

  return controls;
} 