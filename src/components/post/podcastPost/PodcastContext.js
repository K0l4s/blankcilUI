// import React, { createContext, useContext, useRef } from 'react';

// // Tạo một Context
// const AudioPlayerContext = createContext();

// // Hook để sử dụng context
// export const useAudioPlayer = () => useContext(AudioPlayerContext);

// // Provider component
// export const AudioPlayerProvider = ({ children }) => {
//   const audioRefs = useRef([]);

//   const pauseOthers = (currentId) => {
//     audioRefs.current.forEach((ref, index) => {
//       if (index !== currentId && ref.current) {
//         ref.current.pause();
//       }
//     });
//   };

//   return (
//     <AudioPlayerContext.Provider value={{ audioRefs, pauseOthers }}>
//       {children}
//     </AudioPlayerContext.Provider>
//   );
// };
// // Chỉnh lại code để phù hợp với video

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
        // Dừng phát video thay vì audio
        ref.current.pause();
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
