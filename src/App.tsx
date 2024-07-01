import { useCallback, useEffect, useState } from "react";
import { PlayerControlPanel } from "./PlayerControlPanel";
import { GameState, PlayerState } from "./types";
import { Room } from "./Room";
import { GameInfo } from "./GameInfo";
import { ENTITY_TYPE } from "./constants";

function App() {
  const [gameState, setGameState] = useState<GameState>({
    // List of tuples with entity type and id of entity
    turnCycle: [
      [ENTITY_TYPE.PLAYER, 1],
      [ENTITY_TYPE.ENEMY, 1],
      [ENTITY_TYPE.ENEMY, 2],
    ],
    isGameOver: false,
    isLoading: false,
  });
  const [playerState, setPlayerState] = useState<PlayerState>({
    isAttacking: false,
    isMoving: false,
    isUsingSkill: false,
  });

  // Handle player and enemy's end turn action
  const handleEndTurn = useCallback(() => {
    // Rotate turn cycle, moving whatever was first in the cycle to the end of the cycle

    const currentTurnCycle = gameState.turnCycle;
    const currentEntityTurn = currentTurnCycle.shift();

    if (!currentEntityTurn) {
      console.error("No entity turn found in turn cycle");
      return null;
    }

    currentTurnCycle.push(currentEntityTurn);

    const newTurnCycle = [...currentTurnCycle];

    setGameState((prevState) => ({
      ...prevState,
      turnCycle: newTurnCycle,
    }));

    return null;
  }, [gameState.turnCycle]);

  // Handle enemy's action
  useEffect(() => {
    if (gameState.turnCycle[0][0] === ENTITY_TYPE.ENEMY) {
      // Set loading state to true (mocking backend call for enemy action)
      setGameState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      // Simulate enemy action with a timeout
      setTimeout(() => {
        // End enemy's turn
        handleEndTurn();
        setGameState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      }, 1500);
    }
  }, [gameState.turnCycle, handleEndTurn]);

  return (
    <div className="relative w-full h-screen flex flex-col justify-start">
      <header className="mt-10 mb-10">
        <h1 className="mb-2">Return to Olympus</h1>
        <h2>Combat Simulator</h2>
      </header>
      <div className="mb-10">
        <GameInfo gameState={gameState} />
      </div>
      <div className="ml-auto mr-auto mb-10 ">
        <Room gameState={gameState} playerState={playerState} />
      </div>
      {/* Control Panel */}
      <PlayerControlPanel
        playerState={playerState}
        setPlayerState={setPlayerState}
        onEndTurn={handleEndTurn}
        disabled={gameState.turnCycle[0][0] !== ENTITY_TYPE.PLAYER}
      />
    </div>
  );
}

export default App;
