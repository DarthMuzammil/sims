import { CONTROLS_TEXT } from "../../constants/ui";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ControlsOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-black/70 text-white p-4 rounded-lg mb-4 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">{CONTROLS_TEXT.TITLE}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close controls"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <p>{CONTROLS_TEXT.MOVEMENT}</p>
              <p>{CONTROLS_TEXT.INTERACTION}</p>
              <p>{CONTROLS_TEXT.CHAT}</p>
              <p>{CONTROLS_TEXT.CAMERA}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`bg-black/70 text-white p-3 rounded-full hover:bg-black/80 transition-colors backdrop-blur-sm
          ${isOpen ? 'hidden' : 'flex'} items-center gap-2`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Show controls"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span className="text-sm font-medium">Controls</span>
      </motion.button>
    </div>
  );
}; 