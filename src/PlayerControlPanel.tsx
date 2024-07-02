import { type FC } from "react";
import { IPlayer, IPlayerState } from "./types";
import clsx from "clsx";
const skills: { name: string; damage: number }[] = [
  {
    name: "Fireball",
    damage: 10,
  },
  {
    name: "Heal",
    damage: -10,
  },
  {
    name: "Lightning",
    damage: 15,
  },
];

export const PlayerControlPanel: FC<{
  player: IPlayer;
  setPlayer: (state: IPlayer) => void;
  onEndTurn: () => void;
  disabled: boolean;
}> = ({ player, setPlayer, onEndTurn, disabled }) => {
  const handleEndTurnClick = () => {
    setPlayer({
      ...player,
      state: {
        isAttacking: false,
        isMoving: false,
        isUsingSkill: false,
      },
    });
    onEndTurn();
  };

  const handlePlayerStateChange = (state: IPlayerState) => {
    setPlayer({
      ...player,
      state,
    });
  };

  return (
    <div>
      <div
        className={clsx(
          "w-screen p-4 flex justify-center items-center gap-5 box-border",
          { "bg-white": !disabled },
          { "bg-gray-300": disabled },
          { "pointer-events-none": disabled }
        )}
      >
        {player.state.isUsingSkill ? (
          <>
            {skills.map((skill) => (
              <Button
                key={skill.name}
                onClick={() => console.log(skill.name)}
                disabled={disabled}
              >
                {skill.name}
              </Button>
            ))}
            <Button
              onClick={() =>
                handlePlayerStateChange({
                  ...player.state,
                  isAttacking: false,
                  isMoving: false,
                  isUsingSkill: false,
                })
              }
              disabled={disabled}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                handlePlayerStateChange({
                  ...player.state,
                  isAttacking: !player.state.isAttacking,
                  isMoving: false,
                  isUsingSkill: false,
                });
              }}
              disabled={
                disabled ||
                (player.equipment.weapon &&
                  player.actionPoints < player.equipment.weapon.cost)
              }
            >
              Attack
            </Button>
            <Button
              onClick={() => {
                handlePlayerStateChange({
                  ...player.state,
                  isAttacking: false,
                  isMoving: !player.state.isMoving,
                  isUsingSkill: false,
                });
              }}
              disabled={disabled}
            >
              Move
            </Button>
            <Button
              onClick={() => {
                handlePlayerStateChange({
                  ...player.state,
                  isAttacking: false,
                  isMoving: false,
                  isUsingSkill: !player.state.isUsingSkill,
                });
              }}
              disabled={disabled}
            >
              Skills
            </Button>
            <Button onClick={handleEndTurnClick} disabled={disabled}>
              End Turn
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const Button: FC<{
  children: string;
  onClick: () => void;
  disabled?: boolean | undefined | null;
}> = ({ children, onClick, disabled }) => {
  return (
    <button
      className={clsx(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        { "opacity-50": disabled }
      )}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      {children}
    </button>
  );
};
