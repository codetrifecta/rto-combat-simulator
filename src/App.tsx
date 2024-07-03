import { useEffect, useMemo, useState } from "react";
import { PlayerControlPanel } from "./components/PlayerControlPanel";
import { IEnemy } from "./types";
import { Room } from "./components/Room";
import { GameInfo } from "./components/GameInfo";
import { ENTITY_TYPE } from "./constants";
import { PlayerInfo } from "./components/PlayerInfo";
import { useGameStateStore } from "./store/game";
import { usePlayerStore } from "./store/player";
import { useEnemyStore } from "./store/enemy";
import { Logger } from "./components/Logger";
import { useLogStore } from "./store/log";
import clsx from "clsx";

function App() {
  const [headerOpen, setHeaderOpen] = useState(false);
  const [currentHoveredEntity, setCurrentHoveredEntity] =
    useState<IEnemy | null>(null);

  const { turnCycle, setTurnCycle, setIsLoading, endTurn } =
    useGameStateStore();

  const { getPlayer } = usePlayerStore();

  const player = getPlayer();

  const { enemies } = useEnemyStore();

  const { addLog } = useLogStore();

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

  // Handle enemy's action
  useEffect(() => {
    if (turnCycle.length > 0 && turnCycle[0].entityType === ENTITY_TYPE.ENEMY) {
      setIsLoading(true);

      // Simulate enemy action with a timeout
      setTimeout(() => {
        // End enemy's turn
        addLog({
          message: (
            <>
              <span className="text-red-500">{turnCycle[0].name}</span> ended
              their turn.
            </>
          ),
          type: "info",
        });
        endTurn();
        setIsLoading(false);
      }, 1500);
    }
  }, [turnCycle, turnCycle.length]);

  // Wait for game initialization
  if (!isInitialized) {
    return (
      <h1 className="w-screen h-screen flex justify-center items-center">
        Loading...
      </h1>
    );
  }

  return (
    <div className="relative w-full h-screen flex flex-col justify-start">
      <header className="absolute top-0 w-full z-20">
        <div
          className="absolute h-[20px] w-full z-20"
          onMouseEnter={() => setHeaderOpen(true)}
          onMouseLeave={() => setHeaderOpen(false)}
        ></div>
        <div
          className={clsx(
            "absolute h-[135px] pt-3 w-full flex flex-col justify-start items-center bg-neutral-900 transition-all ease duration-300 delay-0",
            { "top-[-135px] ": !headerOpen },
            { "top-0": headerOpen }
          )}
        >
          <h1 className="mb-2 uppercase">
            R<span className="text-4xl">eturn</span>{" "}
            <span className="text-4xl">to</span> O
            <span className="text-4xl">lympus</span>
          </h1>
          <h2>Combat Simulator</h2>
        </div>
      </header>

      {/* Game Info (Currently only displays turn cycle) */}
      <div className="mt-10 mb-8">
        <GameInfo
          currentHoveredEntity={currentHoveredEntity}
          setCurrentHoveredEntity={setCurrentHoveredEntity}
        />
      </div>

      {/* Combat Room */}
      <div className="mb-6 grid grid-rows-1 grid-cols-8 w-full px-16 gap-5">
        <div className="col-span-2"></div>
        <div className="col-span-4 flex justify-center items-center">
          <Room
            currentHoveredEntity={currentHoveredEntity}
            setCurrentHoveredEntity={setCurrentHoveredEntity}
          />
        </div>
        <div className="relative col-span-2">
          <Logger />
        </div>
      </div>

      {/* Player Info */}
      <div className="mb-6">
        <PlayerInfo player={player} />
      </div>

      {/* Player Control Panel */}
      <PlayerControlPanel />
    </div>
  );
}

export default App;
