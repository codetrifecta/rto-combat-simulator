import { type FC } from "react";
import { PlayerState } from "./types";
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
  playerState: PlayerState;
  setPlayerState: (state: PlayerState) => void;
  onEndTurn: () => void;
  disabled: boolean;
}> = ({ playerState, setPlayerState, onEndTurn, disabled }) => {
  const handleEndTurnClick = () => {
    const newActionPoints =
      playerState.actionPoints >= 2 ? 6 : playerState.actionPoints + 4;

    setPlayerState({
      ...playerState,
      actionPoints: newActionPoints,
      isAttacking: false,
      isMoving: false,
      isUsingSkill: false,
    });
    onEndTurn();
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
        {playerState.isUsingSkill ? (
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
                setPlayerState({
                  ...playerState,
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
                setPlayerState({
                  ...playerState,
                  isAttacking: true,
                  isMoving: false,
                  isUsingSkill: false,
                });
              }}
              disabled={disabled}
            >
              Attack
            </Button>
            <Button
              onClick={() => {
                setPlayerState({
                  ...playerState,
                  isAttacking: false,
                  isMoving: true,
                  isUsingSkill: false,
                });
              }}
              disabled={disabled}
            >
              Move
            </Button>
            <Button
              onClick={() => {
                setPlayerState({
                  ...playerState,
                  isAttacking: false,
                  isMoving: false,
                  isUsingSkill: true,
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
  disabled?: boolean;
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
