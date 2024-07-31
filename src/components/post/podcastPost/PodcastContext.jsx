

import React, { createContext, useContext, useRef } from 'react';

// Tạo một Context
const AudioPlayerContext = createContext();

// Hook để sử dụng context
export const useAudioPlayer = () => useContext(AudioPlayerContext);

// Provider component
export const AudioPlayerProvider = ({ children }) => {
  const audioRefs = useRef([]);

  const pauseOthers = (currentId) => {
    audioRefs.current.forEach((ref, index) => {
      if (index !== currentId && ref.current) {
        ref.current.pause();
        if (document.getElementById('playicon' + index) == null
          || document.getElementById('backdrop' + index) == null
          || document.getElementById(`avatar${index}`) == null)
          return
        document.getElementById('playicon' + index).style.display = 'block';
        document.getElementById('backdrop' + index).style.opacity = 1;
        document.getElementById(`avatar${index}`).classList.remove('isPlay');
        // document.getElementById('backdrop' + index).classList.remove('active');
      }
      // console.log(ref.current);
    });
  };

  return (
    <AudioPlayerContext.Provider value={{ audioRefs, pauseOthers }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
