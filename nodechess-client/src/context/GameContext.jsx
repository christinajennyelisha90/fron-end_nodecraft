import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {

  const [currentRoom, setCurrentRoom] = useState(null);
  const [opponent, setOpponent] = useState(null);

  return (
    <GameContext.Provider value={{
      currentRoom,
      setCurrentRoom,
      opponent,
      setOpponent
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);