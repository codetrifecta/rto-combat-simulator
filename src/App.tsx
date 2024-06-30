import { useState } from "react";
import { PlayerControlPanel } from "./PlayerControlPanel";
import { PlayerState } from "./types";
import { Room } from "./Room";

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
        <Room playerState={playerState} />
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
