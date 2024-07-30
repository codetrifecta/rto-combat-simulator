import { useEffect, useMemo, useRef, useState } from 'react';

import { PlayerControlPanel } from './components/PlayerControlPanel';
import { IEntity } from './types';
import { Room } from './components/Room';
import { TurnInfo } from './components/TurnInfo';
import { PlayerInfo } from './components/PlayerInfo';
import { useGameStateStore } from './store/game';
import { usePlayerStore } from './store/player';
import { useEnemyStore } from './store/enemy';
import { Logger } from './components/Logger';
import clsx from 'clsx';
import { InventoryChooser } from './components/InventoryChooser';
import { CharacterSheet } from './components/CharacterSheet';
import { GenerateRoomModal } from './components/GenerateRoomModal';
import { PLAYER_CONTROL_PANEL_HEIGHT } from './constants/game';

// Flag for first room render

// Camera movement speed
// const cameraStraightMoveSpeed = 7;
// const cameraDiagonalMoveSpeed = Math.sqrt(cameraStraightMoveSpeed ** 2 / 2);

const MAX_CAMERA_STRIGHT_MOVE_SPEED = 8;
const MAX_CAMERA_DIAGONAL_MOVE_SPEED = Math.sqrt(
  MAX_CAMERA_STRIGHT_MOVE_SPEED ** 2 / 2
);
const DELTA_ACCELERATION = 0.05;
const DELTA_DECELERATION = 0.94;

let deltaX = 0;
let deltaY = 0;

// Keys that are available for camera movement
const availableKeys = ['w', 'a', 's', 'd', 'l', 'c', 'i', '+', '=', '-'];

// Camera scale and scale step
let currentScale = 1;
const scaleStep = 0.02;

// Record of keys that are currently pressed
const keyPressed: Record<string, boolean> = {};

function App() {
  const [firstRoomRender, setFirstRoomRender] = useState(true);

  const [headerOpen, setHeaderOpen] = useState(false);
  const [currentHoveredEntity, setCurrentHoveredEntity] =
    useState<IEntity | null>(null);

  const roomContainerRef = useRef<HTMLDivElement>(null);
  const roomScrollRef = useRef<HTMLDivElement>(null);

  const {
    turnCycle,
    isInventoryOpen,
    isGameLogOpen,
    isCharacterSheetOpen,
    isGenerateRoomOpen,
    setIsInventoryOpen,
    setIsGameLogOpen,
    setIsCharacterSheetOpen,
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

    const handleKeydownEvent = (e: KeyboardEvent) => {
      if (availableKeys.includes(e.key.toLowerCase())) {
        if (keyPressed[e.key] === undefined) {
          keyPressed[e.key] = true;
        }
      }
    };

    const handleKeyupEvent = (e: KeyboardEvent) => {
      if (availableKeys.includes(e.key.toLowerCase())) {
        delete keyPressed[e.key];
      }
    };

    // Add event listeners for keyboard input
    document.body.addEventListener('keydown', handleKeydownEvent);
    document.body.addEventListener('keyup', handleKeyupEvent);

    // Remove event listeners on unmount
    return () => {
      document.body.removeEventListener('keydown', handleKeydownEvent);
      document.body.removeEventListener('keyup', handleKeyupEvent);
    };
  }, []);

  // When room container ref value changes, (in this case when the room container is mounted).
  // Scroll into the middle of the room container (to view the room)
  useEffect(() => {
    const scrollIntoMiddleOfRoom = () => {
      if (roomContainerRef.current !== null && firstRoomRender) {
        setTimeout(() => {
          if (
            roomContainerRef.current !== null &&
            roomScrollRef.current !== null
          ) {
            const roomContainerX = roomContainerRef.current.offsetWidth / 2;
            const roomContainerY = roomContainerRef.current.offsetHeight / 2;

            roomScrollRef.current.scrollLeft =
              roomContainerX - window.innerWidth / 2;
            roomScrollRef.current.scrollTop =
              roomContainerY - window.innerHeight / 2;

            bufferArtRender();
          }
        }, 500);
      }
    };

    const bufferArtRender = () =>
      setTimeout(() => {
        setFirstRoomRender(false);
      }, 100);

    scrollIntoMiddleOfRoom();
  }, [roomContainerRef.current, roomScrollRef.current]);

  // Check every 50ms to check input to move camera
  useEffect(() => {
    const cameraKeyInputCheckInterval = setInterval(() => {
      if (isGenerateRoomOpen) return;

      if (roomContainerRef.current && roomScrollRef.current) {
        if (keyPressed['w'] === true && keyPressed['a'] === true) {
          if (Math.abs(deltaY) < MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaY -= MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaY = -MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }

          if (Math.abs(deltaX) < MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaX -= MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaX = -MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }

          // roomScrollRef.current.scrollTop -= cameraDiagonalMoveSpeed;
          // roomScrollRef.current.scrollLeft -= cameraDiagonalMoveSpeed;
        } else if (keyPressed['w'] === true && keyPressed['s'] === true) {
          // Do nothing if both w and s are pressed
        } else if (keyPressed['w'] === true && keyPressed['d'] === true) {
          if (Math.abs(deltaY) < MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaY -= MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaY = -MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }

          if (Math.abs(deltaX) < MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaX += MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaX = MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }

          // roomScrollRef.current.scrollTop -= cameraDiagonalMoveSpeed;
          // roomScrollRef.current.scrollLeft += cameraDiagonalMoveSpeed;
        } else if (keyPressed['s'] === true && keyPressed['a'] === true) {
          if (Math.abs(deltaY) < MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaY += MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaY = MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }

          if (Math.abs(deltaX) < MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaX -= MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaX = -MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }

          // roomScrollRef.current.scrollTop += cameraDiagonalMoveSpeed;
          // roomScrollRef.current.scrollLeft -= cameraDiagonalMoveSpeed;
        } else if (keyPressed['s'] === true && keyPressed['d'] === true) {
          if (Math.abs(deltaY) < MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaY += MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaY = MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }

          if (Math.abs(deltaX) < MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaX += MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaX = MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }

          // roomScrollRef.current.scrollTop += cameraDiagonalMoveSpeed;
          // roomScrollRef.current.scrollLeft += cameraDiagonalMoveSpeed;
        } else if (keyPressed['a'] === true && keyPressed['d'] === true) {
          // Do nothing if both w and s are pressed
        } else if (keyPressed['w'] === true) {
          if (deltaY > -MAX_CAMERA_STRIGHT_MOVE_SPEED) {
            deltaY -= MAX_CAMERA_STRIGHT_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaY = -MAX_CAMERA_STRIGHT_MOVE_SPEED;
          }
          // roomScrollRef.current.scrollTop -= cameraStraightMoveSpeed;
        } else if (keyPressed['a'] === true) {
          if (deltaX > -MAX_CAMERA_STRIGHT_MOVE_SPEED) {
            deltaX -= MAX_CAMERA_STRIGHT_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaX = -MAX_CAMERA_STRIGHT_MOVE_SPEED;
          }

          // roomScrollRef.current.scrollLeft -= cameraStraightMoveSpeed;
        } else if (keyPressed['s'] === true) {
          if (deltaY < MAX_CAMERA_STRIGHT_MOVE_SPEED) {
            deltaY += MAX_CAMERA_STRIGHT_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaY = MAX_CAMERA_STRIGHT_MOVE_SPEED;
          }

          // roomScrollRef.current.scrollTop += cameraStraightMoveSpeed;
        } else if (keyPressed['d'] === true) {
          if (deltaX < MAX_CAMERA_STRIGHT_MOVE_SPEED) {
            deltaX += MAX_CAMERA_STRIGHT_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaX = MAX_CAMERA_STRIGHT_MOVE_SPEED;
          }

          // roomScrollRef.current.scrollLeft += cameraStraightMoveSpeed;
        }

        roomScrollRef.current.scrollTop =
          roomScrollRef.current.scrollTop + deltaY;
        roomScrollRef.current.scrollLeft =
          roomScrollRef.current.scrollLeft + deltaX;

        // If no movement keys are pressed, decelerate
        if (!keyPressed['a'] && !keyPressed['d']) {
          if (Math.abs(deltaX) < 0.8) {
            deltaX = 0;
          } else {
            deltaX *= DELTA_DECELERATION;
          }
        }
        if (!keyPressed['w'] && !keyPressed['s']) {
          if (Math.abs(deltaY) < 0.8) {
            deltaY = 0;
          } else {
            deltaY *= DELTA_DECELERATION;
          }
        }

        if (keyPressed['+'] === true || keyPressed['='] === true) {
          if (currentScale < 1.6) {
            currentScale += scaleStep;
            roomContainerRef.current.style.transform = `scale(${currentScale})`;
          }
        } else if (keyPressed['-'] === true) {
          if (currentScale > 0.7) {
            currentScale -= scaleStep;
            roomContainerRef.current.style.transform = `scale(${currentScale})`;
          }
        }
      }
    }, 10);

    return () => {
      clearInterval(cameraKeyInputCheckInterval);
    };
  }, [isGenerateRoomOpen]);

  // Add event listeres for other shortcuts
  useEffect(() => {
    const handleShortcutKeys = (e: KeyboardEvent) => {
      // if (e.key === "Escape") {
      //   setIsInventoryOpen(false);
      //   setIsGameLogOpen(false);
      //   setIsCharacterSheetOpen(false);
      //   setIsGenerateRoomOpen(false);
      // }

      if (isGenerateRoomOpen) {
        return;
      } else {
        if (e.key === 'i') {
          setIsInventoryOpen(!isInventoryOpen);
        }

        if (e.key === 'l') {
          setIsGameLogOpen(!isGameLogOpen);
        }

        if (e.key === 'c') {
          setIsCharacterSheetOpen(!isCharacterSheetOpen);
        }
      }
    };

    // Add event listeners for keyboard input
    document.body.addEventListener('keydown', handleShortcutKeys);

    // Remove event listeners on unmount
    return () => {
      document.body.removeEventListener('keydown', handleShortcutKeys);
    };
  }, [
    isGameLogOpen,
    isInventoryOpen,
    isCharacterSheetOpen,
    setIsGameLogOpen,
    setIsCharacterSheetOpen,
    setIsInventoryOpen,
    isGenerateRoomOpen,
  ]);

  const isInitialized = useMemo(() => {
    return turnCycle.length > 0;
  }, [turnCycle]);

  // Wait for game initialization
  if (!isInitialized) {
    return (
      <h1 className="w-screen h-screen flex justify-center items-center bg-black"></h1>
    );
  }

  return (
    <>
      {firstRoomRender === true ? (
        <h1 className="fixed w-screen h-screen flex justify-center items-center z-[100] bg-black">
          Loading...
        </h1>
      ) : null}
      <div className="relative max-w-screen h-screen flex flex-col justify-start overflow-hidden">
        <header className="absolute top-0 w-full z-[100]">
          <div
            className="absolute h-[20px] w-full z-20"
            onMouseEnter={() => setHeaderOpen(true)}
            onMouseLeave={() => setHeaderOpen(false)}
          ></div>
          <div
            className={clsx(
              'absolute h-[135px] pt-3 w-full flex flex-col justify-start items-center bg-neutral-900 transition-all ease duration-300 delay-0',
              { 'top-[-135px] ': !headerOpen },
              { 'top-0': headerOpen }
            )}
          >
            <h1 className="mb-2 uppercase">
              R<span className="text-4xl">eturn</span>{' '}
              <span className="text-4xl">to</span> O
              <span className="text-4xl">lympus</span>
            </h1>
            <h2>Combat Simulator</h2>
          </div>
        </header>

        {/* Game Info (Currently only displays turn cycle) */}
        <section
          className="fixed z-40 mt-10 mb-6"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <TurnInfo
            currentHoveredEntity={currentHoveredEntity}
            setCurrentHoveredEntity={setCurrentHoveredEntity}
          />
        </section>

        <div
          className={clsx('fixed left-10 top-60 w-[23%] max-h-[200px]', {
            'z-20': isGameLogOpen,
            'z-[-10] opacity-0': !isGameLogOpen,
          })}
        >
          <Logger />
        </div>

        <div
          className={clsx(
            'fixed left-0 w-[400px] shadow-lg transition-all ease duration-300 delay-0 z-30'
          )}
          style={{
            height: `calc(100vh - ${PLAYER_CONTROL_PANEL_HEIGHT}px)`,
            left: isCharacterSheetOpen ? 0 : -400,
            visibility: isCharacterSheetOpen ? 'visible' : 'hidden',
          }}
        >
          <CharacterSheet />
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

        {/* Generate Room */}
        <section
          className="fixed z-[60] top-0 w-screen shadow-lg"
          style={{
            height: `calc(100vh - ${PLAYER_CONTROL_PANEL_HEIGHT}px)`,
            visibility: isGenerateRoomOpen ? 'visible' : 'hidden',
          }}
        >
          <GenerateRoomModal />
        </section>

        {/* Inventory Chooser */}
        <section
          className="fixed z-[30] top-0 w-[400px] shadow-lg transition-all ease duration-300 delay-0"
          style={{
            height: `calc(100vh - ${PLAYER_CONTROL_PANEL_HEIGHT}px)`,
            right: isInventoryOpen ? 0 : -400,
            visibility: isInventoryOpen ? 'visible' : 'hidden',
          }}
        >
          <InventoryChooser />
          <div></div>
        </section>
        {/* )} */}

        {/* <div className="fixed bottom-0 flex flex-col justify-between items-center"> */}
        {/* Player Info */}
        <section
          className="mb-1 max-w-[3400px] fixed bottom-[80px] z-50"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <PlayerInfo />
        </section>

        {/* Player Control Panel */}
        <section
          className="z-50 fixed bottom-0"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <PlayerControlPanel />
        </section>
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
