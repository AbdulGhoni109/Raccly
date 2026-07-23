import React, { createContext, useContext, useState, useCallback } from 'react';

const MascotContext = createContext();

export function MascotProvider({ children }) {
  const [message, setMessage] = useState("");
  const [isBouncing, setIsBouncing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const setMascotMessage = useCallback((msg, bounce = false) => {
    setMessage(msg);
    setIsVisible(!!msg);
    if (bounce) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 800);
    }
  }, []);

  const hideMascot = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <MascotContext.Provider value={{ message, isVisible, isBouncing, setMascotMessage, hideMascot }}>
      {children}
    </MascotContext.Provider>
  );
}

export function useMascot() {
  return useContext(MascotContext);
}
