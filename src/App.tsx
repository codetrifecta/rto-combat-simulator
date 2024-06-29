// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useState } from "react";
import { PlayerControlPanel } from "./PlayerControlPanel";
import { Grid } from "./components/Grid";
import { GRID_SIZE } from "./constants";
import { PlayerState } from "./types";

const gridDimensions = 5;
const totalGridSize = gridDimensions * GRID_SIZE;

// const gridContainerClassName = `grid grid-rows-${gridDimensions} grid-cols-${gridDimensions}`;

function App() {
  // const [count, setCount] = useState(0);
  // const [playerHealth, setPlayerHealth] = useState(100);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isAttacking: false,
    isMoving: false,
    isUsingSkill: false,
  });

  return (
    <div className="relative w-full h-screen flex flex-col justify-start">
      <header className="mt-10 mb-10">
        <h1 className="mb-2">Return to Olympus</h1>
        <h2>Combat Simulator</h2>
      </header>
      <div className="ml-auto mr-auto mb-10 ">
        <div
          style={{
            width: totalGridSize,
            height: totalGridSize,
            display: "grid",
            gridTemplateColumns: `repeat(${gridDimensions}, ${GRID_SIZE}px)`,
            gridTemplateRows: `repeat(${gridDimensions}, ${GRID_SIZE}px)`,
          }}
          // className={gridContainerClassName}
        >
          {Array.from({ length: gridDimensions ** 2 }).map((_, index) => (
            <Grid key={index} playerState={playerState} />
          ))}
        </div>
      </div>
      {/* Control Panel */}
      <PlayerControlPanel
        playerState={playerState}
        setPlayerState={setPlayerState}
      />
    </div>
  );
}

export default App;
