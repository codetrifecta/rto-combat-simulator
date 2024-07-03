import { useCallback, useEffect, useMemo, useState } from "react";
import { PlayerControlPanel } from "./PlayerControlPanel";
import { IEnemy, IGameState, IPlayer } from "./types";
import { Room } from "./Room";
import { GameInfo } from "./GameInfo";
import { ENTITY_TYPE } from "./constants";
import { PlayerInfo } from "./PlayerInfo";

function App() {
  const [currentHoveredEntity, setCurrentHoveredEntity] =
    useState<IEnemy | null>(null);

  const [gameState, setGameState] = useState<IGameState>({
    // List of tuples with entity type and id of entity
    turnCycle: [],
    isGameOver: false,
    isLoading: true,
  });
  const [player, setPlayer] = useState<IPlayer>({
    id: 1,
    name: "Kratos",
    entityType: ENTITY_TYPE.PLAYER,
    health: 10,
    actionPoints: 2,
    skills: [],
    state: {
      isAttacking: false,
      isMoving: false,
      isUsingSkill: false,
    },
    equipment: {
      weapon: {
        name: "Sword",
        damage: 2,
        range: 1,
        cost: 1,
        // name: "Staff",
        // damage: 1,
        // range: 4,
        // cost: 1,
      },
      helmet: null,
      armor: null,
      leggings: null,
    },
  });
  const [enemies, setEnemies] = useState<IEnemy[]>([
    {
      id: 1,
      name: "Enemy 1",
      entityType: ENTITY_TYPE.ENEMY,
      health: 4,
    },
    {
      id: 2,
      name: "Enemy 2",
      entityType: ENTITY_TYPE.ENEMY,
      health: 4,
    },
  ]);

  // Initialize game state
  useEffect(() => {
    // Set turn cycle
    setGameState((prevState) => ({
      ...prevState,
      turnCycle: [player, ...enemies],
      isLoading: false,
    }));
  }, []);

  const isInitialized = useMemo(() => {
    return gameState.turnCycle.length > 0;
  }, [gameState.turnCycle]);

  // Remove defeated enemies from the turn cycle when they are no longer in the enemies list
  useEffect(() => {
    if (gameState.turnCycle.length > 0) {
      const newTurnCycle = gameState.turnCycle.filter((entity) => {
        if (entity.entityType === ENTITY_TYPE.ENEMY) {
          const enemy = enemies.find((e) => e.id === entity.id);
          if (!enemy) {
            return false;
          }
        }
        return true;
      });
      // console.log("newTurnCycle", gameState);
      setGameState((prevState) => ({
        ...prevState,
        turnCycle: newTurnCycle,
      }));
    }
  }, [enemies.length]);

  // Handle end turn by rotating turn cycle by 1
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

  // Handle player's end turn action
  const handlePlayerEndTurn = useCallback(() => {
    // console.log("Ending player turn and gaining AP", gameState.turnCycle);

    // If current turn is player, end player's turn and give action points
    if (gameState.turnCycle[0].entityType === ENTITY_TYPE.PLAYER) {
      const newActionPoints =
        player.actionPoints >= 2 ? 6 : player.actionPoints + 4;
      setPlayer((prevState) => ({
        ...prevState,
        actionPoints: newActionPoints,
      }));
    }

    // Rotate turn cycle, moving whatever was first in the cycle to the end of the cycle
    handleEndTurn();
  }, [gameState.turnCycle, handleEndTurn, player.actionPoints]);

  // Handle enemy's action
  useEffect(() => {
    if (
      gameState.turnCycle.length > 0 &&
      gameState.turnCycle[0].entityType === ENTITY_TYPE.ENEMY
    ) {
      // console.log("Enemy action", gameState.turnCycle);
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
  }, [gameState.turnCycle, gameState.turnCycle.length, handleEndTurn]);

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
        <GameInfo
          gameState={gameState}
          currentHoveredEntity={currentHoveredEntity}
        />
      </div>
      <div className="ml-auto mr-auto mb-10 ">
        <Room
          gameState={gameState}
          player={player}
          setPlayer={setPlayer}
          enemies={enemies}
          setEnemies={setEnemies}
          onEndTurn={handlePlayerEndTurn}
          setCurrentHoveredEntity={setCurrentHoveredEntity}
        />
      </div>

      {/* Player Info */}
      <div className="mb-5">
        <PlayerInfo player={player} />
      </div>

      {/* Player Control Panel */}
      <PlayerControlPanel
        player={player}
        setPlayer={setPlayer}
        onEndTurn={handlePlayerEndTurn}
        disabled={gameState.turnCycle[0].entityType !== ENTITY_TYPE.PLAYER}
      />
    </div>
  );
}

export default App;
