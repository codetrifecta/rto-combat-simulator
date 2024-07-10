import { FC } from "react";

import { usePlayerStore } from "../store/player";

export const CharacterSheet: FC = () => {
  const { getPlayer, getPlayerTotalStats } = usePlayerStore();
  const player = getPlayer();
  const playerStats = getPlayerTotalStats();

  return (
    <div className="h-full bg-zinc-900">
      <h2>Character Sheet</h2>
      <div>
        <h3>{player.name}</h3>
        <p>Health: {player.health}</p>
        <p>Maximum Health: {player.maxHealth}</p>
        <p>Strength: {playerStats.strength}</p>
        <p>Intelligence: {playerStats.intelligence}</p>
        <p>Defense: {playerStats.defense}</p>
        <p>Constituion: {playerStats.constitution}</p>
      </div>
    </div>
  );
};
