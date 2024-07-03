import { useEffect, useMemo, useState } from "react";
import { PlayerControlPanel } from "./components/PlayerControlPanel";
import { IEnemy } from "./types";
import { Room } from "./components/Room";
import { GameInfo } from "./components/GameInfo";
import { ENTITY_TYPE } from "./constants";
import { PlayerInfo } from "./components/PlayerInfo";
import { useGameStateStore } from "./store/game";
import { usePlayerStore } from "./store/player";

function App() {
  const [currentHoveredEntity, setCurrentHoveredEntity] =
    useState<IEnemy | null>(null);

  const { turnCycle, setTurnCycle, setIsLoading, endTurn } =
    useGameStateStore();

  const { getPlayer, setPlayerActionPoints } = usePlayerStore();

  const player = getPlayer();

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
    // Set turn cycle and loading state in game store
    setTurnCycle([player, ...enemies]);
    setIsLoading(false);
  }, []);

  const isInitialized = useMemo(() => {
    return turnCycle.length > 0;
  }, [turnCycle]);

  // Remove defeated enemies from the turn cycle when they are no longer in the enemies list
  useEffect(() => {
    if (turnCycle.length > 0) {
      const newTurnCycle = turnCycle.filter((entity) => {
        if (entity.entityType === ENTITY_TYPE.ENEMY) {
          const enemy = enemies.find((e) => e.id === entity.id);
          if (!enemy) {
            return false;
          }
        }
        return true;
      });

      // Update game store turn cycle
      console.log("newTurnCycle", newTurnCycle);
      setTurnCycle(newTurnCycle);
    }
  }, [enemies.length]);

  // Handle player's end turn action
  const handlePlayerEndTurn = () => {
    console.log("Ending player turn and gaining AP", turnCycle);

    // If current turn is player, end player's turn and give action points
    if (turnCycle[0] && turnCycle[0].entityType === ENTITY_TYPE.PLAYER) {
      const newActionPoints =
        player.actionPoints >= 2 ? 6 : player.actionPoints + 4;
      setPlayerActionPoints(newActionPoints);
    }

    endTurn();
  };

  // Handle enemy's action
  useEffect(() => {
    if (turnCycle.length > 0 && turnCycle[0].entityType === ENTITY_TYPE.ENEMY) {
      setIsLoading(true);

      // Simulate enemy action with a timeout
      setTimeout(() => {
        // End enemy's turn
        endTurn();
        setIsLoading(false);
      }, 1500);
    }
  }, [turnCycle, turnCycle.length]);

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
          currentHoveredEntity={currentHoveredEntity}
          setCurrentHoveredEntity={setCurrentHoveredEntity}
        />
      </div>
      <div className="ml-auto mr-auto mb-10 ">
        <Room
          enemies={enemies}
          setEnemies={setEnemies}
          onEndTurn={handlePlayerEndTurn}
          currentHoveredEntity={currentHoveredEntity}
          setCurrentHoveredEntity={setCurrentHoveredEntity}
        />
      </div>

      {/* Player Info */}
      <div className="mb-5">
        <PlayerInfo player={player} />
      </div>

      {/* Player Control Panel */}
      <PlayerControlPanel
        onEndTurn={handlePlayerEndTurn}
        disabled={
          turnCycle[0] !== null &&
          turnCycle[0].entityType !== ENTITY_TYPE.PLAYER
        }
      />
    </div>
  );
}

export default App;
