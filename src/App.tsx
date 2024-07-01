import { useCallback, useEffect, useMemo, useState } from "react";
import { PlayerControlPanel } from "./PlayerControlPanel";
import { Enemy, GameState, PlayerState } from "./types";
import { Room } from "./Room";
import { GameInfo } from "./GameInfo";
import { ENTITY_TYPE } from "./constants";
import { PlayerInfo } from "./PlayerInfo";

function App() {
  const [gameState, setGameState] = useState<GameState>({
    // List of tuples with entity type and id of entity
    turnCycle: [],
    isGameOver: false,
    isLoading: true,
  });
  const [playerState, setPlayerState] = useState<PlayerState>({
    health: 10,
    actionPoints: 1,
    isAttacking: false,
    isMoving: false,
    isUsingSkill: false,
  });
  const [enemies] = useState<Enemy[]>([
    {
      id: 1,
      name: "Enemy 1",
      entityType: ENTITY_TYPE.ENEMY,
      health: 5,
    },
    {
      id: 2,
      name: "Enemy 2",
      entityType: ENTITY_TYPE.ENEMY,
      health: 5,
    },
  ]);

  useEffect(() => {
    // Set turn cycle
    setGameState((prevState) => ({
      ...prevState,
      turnCycle: [
        {
          id: 1,
          name: "Player",
          entityType: ENTITY_TYPE.PLAYER,
          health: playerState.health,
        },
        ...enemies,
      ],
      isLoading: false,
    }));
  }, [playerState.health, enemies]);

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
    if (
      gameState.turnCycle.length > 0 &&
      gameState.turnCycle[0].entityType === ENTITY_TYPE.ENEMY
    ) {
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

  const isInitialized = useMemo(() => {
    return gameState.turnCycle.length > 0;
  }, [gameState.turnCycle]);

  {
    /* Wait for game initialization */
  }
  if (!isInitialized) {
    return (
      <h1 className="w-screen h-screen flex justify-center items-center">
        Loading...
      </h1>
    );
  }

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
        <Room
          gameState={gameState}
          playerState={playerState}
          enemies={enemies}
        />
      </div>

      {/* Player Info */}
      <div className="mb-5">
        <PlayerInfo playerState={playerState} />
      </div>

      {/* Player Control Panel */}
      <PlayerControlPanel
        playerState={playerState}
        setPlayerState={setPlayerState}
        onEndTurn={handleEndTurn}
        disabled={gameState.turnCycle[0].entityType !== ENTITY_TYPE.PLAYER}
      />
    </div>
  );
}

export default App;
