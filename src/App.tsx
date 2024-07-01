import { useState } from "react";
import { PlayerControlPanel } from "./PlayerControlPanel";
import { GameState, PlayerState } from "./types";
import { Room } from "./Room";
import { GameInfo } from "./GameInfo";
import { ENTITY_TYPE } from "./constants";

// const gridContainerClassName = `grid grid-rows-${gridDimensions} grid-cols-${gridDimensions}`;

function App() {
  const [gameState] = useState<GameState>({
    enemies: 1,
    // List of tuples with entity type and id of entity
    turnCycle: [
      [ENTITY_TYPE.ENEMY, 1],
      [ENTITY_TYPE.PLAYER, 1],
    ],
    isGameOver: false,
  });
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
      <div className="mb-10">
        <GameInfo gameState={gameState} />
      </div>
      <div className="ml-auto mr-auto mb-10 ">
        <Room playerState={playerState} />
      </div>
      {/* Control Panel */}
      <PlayerControlPanel
        playerState={playerState}
        setPlayerState={setPlayerState}
        disabled={gameState.turnCycle[0][0] !== ENTITY_TYPE.PLAYER}
      />
    </div>
  );
}

export default App;
