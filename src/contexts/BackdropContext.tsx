import React, { createContext, useState } from 'react';

interface BackdropContextProps {
  backgroundImage: string;
  setBackgroundImage: (image: string) => void;
}

export const BackdropContext = createContext<BackdropContextProps>({
  backgroundImage: '',
  setBackgroundImage: () => {},
});

export const BackdropProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState('');

  return (
    <BackdropContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </BackdropContext.Provider>
  );
};
