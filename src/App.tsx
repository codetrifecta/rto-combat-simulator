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
import { InventoryChooser } from "./components/InventoryChooser";

function App() {
  const [headerOpen, setHeaderOpen] = useState(false);
  const [currentHoveredEntity, setCurrentHoveredEntity] =
    useState<IEnemy | null>(null);

  const { turnCycle, setTurnCycle, setIsLoading, endTurn } =
    useGameStateStore();

  const { getPlayer, setPlayer } = usePlayerStore();

  const player = getPlayer();

  const { enemies } = useEnemyStore();

  const { addLog } = useLogStore();

  // Initialize game state
  useEffect(() => {
    // Set turn cycle and loading state in game store
    setTurnCycle([player, ...enemies]);
    setIsLoading(false);
  }, []);

  // Update player's skills with onClick event handlers to trigger skill effects
  // and log messages
  useEffect(() => {
    if (turnCycle.length > 0) {
      const playerSkills = player.skills.map((skill) => ({
        ...skill,
        onClick: () => {
          if (player.actionPoints >= skill.cost) {
            skill.effect(player, setPlayer);
            addLog({
              message: (
                <>
                  <span className="text-green-500">{player.name}</span> used{" "}
                  <span className="text-green-500">{skill.name}</span>.
                </>
              ),
              type: "info",
            });
          }
        },
      }));
      setPlayer({ ...player, skills: playerSkills });
    }
  }, [turnCycle]);

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
      <section className="mt-10 mb-8">
        <GameInfo
          currentHoveredEntity={currentHoveredEntity}
          setCurrentHoveredEntity={setCurrentHoveredEntity}
        />
      </section>

      {/* Middle Section */}
      <section className="mb-6 grid grid-rows-1 grid-cols-8 w-full lg:px-4 xl:px-16  gap-5">
        <div className="col-span-2">
          <InventoryChooser />
        </div>

        {/* Combat Room */}
        <div className="col-span-4 flex justify-center items-center">
          <Room
            currentHoveredEntity={currentHoveredEntity}
            setCurrentHoveredEntity={setCurrentHoveredEntity}
          />
        </div>
        <div className="relative col-span-2">
          <Logger />
        </div>
      </section>

      {/* Player Info */}
      <section className="mb-6">
        <PlayerInfo player={player} />
      </section>

      {/* Player Control Panel */}
      <section>
        <PlayerControlPanel />
      </section>
    </div>
  );
}

export default App;
