import { useMemo, type FC } from "react";
import clsx from "clsx";
import { usePlayerStore } from "../store/player";
import { useGameStateStore } from "../store/game";
import { ENTITY_TYPE } from "../constants";
import { handlePlayerEndTurn } from "../utils";
import { useLogStore } from "../store/log";

export const PlayerControlPanel: FC = () => {
  const { turnCycle, endTurn } = useGameStateStore();

  const { setPlayerState, getPlayer, setPlayerActionPoints } = usePlayerStore();

  const player = getPlayer();

  const { addLog } = useLogStore();

  const handleEndTurnClick = () => {
    setPlayerState({
      isAttacking: false,
      isMoving: false,
      isUsingSkill: false,
    });
    handlePlayerEndTurn(turnCycle, getPlayer, setPlayerActionPoints, endTurn);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const disabled = useMemo(() => {
    return (
      turnCycle[0] !== null && turnCycle[0].entityType !== ENTITY_TYPE.PLAYER
    );
  }, [turnCycle]);

  console.log("control panel", player.state);

  return (
    <div>
      <div
        className={clsx(
          "w-screen p-4 flex justify-center items-center gap-5 box-border",
          { "bg-neutral-900": !disabled },
          { "opacity-50": disabled },
          { "pointer-events-none": disabled }
        )}
      >
        {player.state.isUsingSkill ? (
          <>
            {player.skills.map((skill) => (
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
                  isAttacking: !player.state.isAttacking,
                  isMoving: false,
                  isUsingSkill: false,
                });
              }}
              disabled={
                disabled ||
                player.equipment.weapon === null ||
                (player.equipment.weapon &&
                  player.actionPoints < player.equipment.weapon.cost)
              }
            >
              Attack
            </Button>
            <Button
              onClick={() => {
                setPlayerState({
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
                setPlayerState({
                  isAttacking: false,
                  isMoving: false,
                  isUsingSkill: !player.state.isUsingSkill,
                });
              }}
              disabled={disabled}
            >
              Skills
            </Button>
            <Button
              onClick={() => {
                handleEndTurnClick();
                addLog({
                  message: (
                    <>
                      <span className="text-green-500">{player.name}</span>{" "}
                      ended their turn.
                    </>
                  ),
                  type: "info",
                });
              }}
              disabled={disabled}
            >
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
        "bg-blue-500  text-white font-bold py-2 px-4 rounded",
        { "hover:bg-blue-700": !disabled },
        { "opacity-50 pointer-event-none": disabled }
      )}
      onClick={() => {
        if (!disabled) onClick();
      }}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
};
