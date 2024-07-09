import { useEffect, useMemo, useRef, useState } from "react";
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

  const roomContainerRef = useRef<HTMLDivElement>(null);

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

  // When room container ref value changes, (in this case when the room container is mounted).
  // Scroll into the middle of the room container (to view the room)
  useEffect(() => {
    if (roomContainerRef.current !== null) {
      setTimeout(() => {
        if (roomContainerRef.current !== null) {
          roomContainerRef.current.scrollIntoView({
            inline: "center",
            block: "center",
          });
        }
      }, 100);
    }
  }, [roomContainerRef.current]);

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
    <div className="relative max-w-screen h-screen flex flex-col justify-start overflow-hidden">
      <div></div>
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
      <section className="fixed w-full z-50 mt-10 mb-6">
        <TurnInfo
          currentHoveredEntity={currentHoveredEntity}
          setCurrentHoveredEntity={setCurrentHoveredEntity}
        />
      </section>

      <div className="fixed left-2 bottom-60 w-[350px] z-50">
        <Logger />
      </div>

      {/* Combat Room */}

      <section className="relative max-w-screen max-h-screen">
        <div className="relative max-w-screen max-h-screen pr-10 hidden-scrollbar overflow-scroll">
          <div
            className="relative min-w-[2000px] min-h-[2000px] flex justify-center items-center"
            ref={roomContainerRef}
          >
            <Room
              currentHoveredEntity={currentHoveredEntity}
              setCurrentHoveredEntity={setCurrentHoveredEntity}
              pr-2
            />
          </div>
        </div>
      </section>

      <div className="fixed bottom-60 right-2 w-[350px] z-50">
        <InventoryChooser />
      </div>

      <div className="fixed bottom-0 z-50">
        {/* Player Info */}
        <section className="mb-6">
          <PlayerInfo />
        </section>

        {/* Player Control Panel */}
        <section>
          <PlayerControlPanel />
        </section>
      </div>
    </div>
  );
}

export default App;
