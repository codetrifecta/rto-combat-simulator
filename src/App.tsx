import { useEffect, useMemo, useState } from "react";
import { PlayerControlPanel } from "./components/PlayerControlPanel";
import { IEntity } from "./types";
import { Room } from "./components/Room";
import { TurnInfo } from "./components/TurnInfo";
import { PlayerInfo } from "./components/PlayerInfo";
import { useGameStateStore } from "./store/game";
import { usePlayerStore } from "./store/player";
import { useEnemyStore } from "./store/enemy";
import { Logger } from "./components/Logger";
import clsx from "clsx";
import { InventoryChooser } from "./components/InventoryChooser";

function App() {
  const [headerOpen, setHeaderOpen] = useState(false);
  const [currentHoveredEntity, setCurrentHoveredEntity] =
    useState<IEntity | null>(null);

  const { turnCycle, setTurnCycle, setIsLoading } = useGameStateStore();

  const { getPlayer } = usePlayerStore();

  const player = getPlayer();

  const { enemies } = useEnemyStore();

  // Initialize game state
  useEffect(() => {
    // Set turn cycle and loading state in game store
    setTurnCycle([player, ...enemies]);
    setIsLoading(false);
  }, []);

  const isInitialized = useMemo(() => {
    return turnCycle.length > 0;
  }, [turnCycle]);

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
      <section className="mt-10 mb-6">
        <TurnInfo
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
        <PlayerInfo />
      </section>

      {/* Player Control Panel */}
      <section>
        <PlayerControlPanel />
      </section>
    </div>
  );
}

export default App;
