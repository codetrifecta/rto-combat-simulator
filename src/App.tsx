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

let firstRoomRender = true;

function App() {
  const [headerOpen, setHeaderOpen] = useState(false);
  const [currentHoveredEntity, setCurrentHoveredEntity] =
    useState<IEntity | null>(null);
  const [keyPressed, setKeyPressed] = useState<Record<string, boolean>>({});

  const roomContainerRef = useRef<HTMLDivElement>(null);
  const roomScrollRef = useRef<HTMLDivElement>(null);

  const {
    turnCycle,
    isInventoryOpen,
    isGameLogOpen,
    setIsInventoryOpen,
    setTurnCycle,
    setIsLoading,
  } = useGameStateStore();

  const { getPlayer } = usePlayerStore();

  const player = getPlayer();

  const { enemies } = useEnemyStore();

  // Initialize game state
  useEffect(() => {
    // Set turn cycle and loading state in game store
    setTurnCycle([player, ...enemies]);
    setIsLoading(false);
    document.body.addEventListener("keydown", (e: KeyboardEvent) => {
      if (["w", "a", "s", "d"].includes(e.key.toLowerCase()))
        setKeyPressed((prevKeyPressed) => ({
          ...prevKeyPressed,
          [e.key]: true,
        }));
    });
    document.body.addEventListener("keyup", (e: KeyboardEvent) => {
      if (["w", "a", "s", "d"].includes(e.key.toLowerCase()))
        setKeyPressed((prevKeyPressed) => {
          const newKeyPressed = { ...prevKeyPressed };
          delete newKeyPressed[e.key];
          return newKeyPressed;
        });
    });
  }, []);

  // When room container ref value changes, (in this case when the room container is mounted).
  // Scroll into the middle of the room container (to view the room)
  useEffect(() => {
    if (roomContainerRef.current !== null && firstRoomRender) {
      firstRoomRender = false;
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

  // Check every 50ms to check input to move camera
  useEffect(() => {
    const keyboardInputCheckInterval = setInterval(() => {
      if (roomContainerRef.current && roomScrollRef.current) {
        const cameraMoveSpeed = 8;

        if (keyPressed["w"] === true) {
          roomScrollRef.current.scrollTop -= cameraMoveSpeed;
        }

        if (keyPressed["a"] === true) {
          roomScrollRef.current.scrollLeft -= cameraMoveSpeed;
        }

        if (keyPressed["s"] === true) {
          roomScrollRef.current.scrollTop += cameraMoveSpeed;
        }

        if (keyPressed["d"] === true) {
          roomScrollRef.current.scrollLeft += cameraMoveSpeed;
        }
      }
    }, 10);

    return () => {
      clearInterval(keyboardInputCheckInterval);
    };
  }, [keyPressed]);

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
    <div
      className="relative max-w-screen h-screen flex flex-col justify-start overflow-hidden"
      // onKeyDown={handleRoomKeyDown}
      // tabIndex={0}
    >
      <div></div>
      <header className="absolute top-0 w-full z-[100]">
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
      <section className="fixed w-full z-30 mt-10 mb-6">
        <TurnInfo
          currentHoveredEntity={currentHoveredEntity}
          setCurrentHoveredEntity={setCurrentHoveredEntity}
        />
      </section>

      <div
        className={clsx("fixed left-10 bottom-60 w-[25%]", {
          "z-40": isGameLogOpen,
          "z-[-10] opacity-0": !isGameLogOpen,
        })}
      >
        <Logger />
      </div>

      {/* Combat Room */}

      <section className="relative max-w-screen max-h-screen">
        <div
          className="relative max-w-screen max-h-screen pr-10 hidden-scrollbar overflow-scroll"
          ref={roomScrollRef}
        >
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

      {/* Inventory Chooser */}
      {isInventoryOpen === true && (
        <section
          className="fixed z-40 flex justify-center items-center w-full h-full p-48"
          onClick={() => {
            setIsInventoryOpen(false);
          }}
        >
          <InventoryChooser />
          <div></div>
        </section>
      )}

      <div className="fixed bottom-0 z-30">
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
