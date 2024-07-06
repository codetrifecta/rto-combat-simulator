import { useMemo, useState, type FC } from "react";
import clsx from "clsx";
import { usePlayerStore } from "../store/player";
import { useGameStateStore } from "../store/game";
import { ENTITY_TYPE } from "../constants";
import { handlePlayerEndTurn } from "../utils";
import { useLogStore } from "../store/log";
import { Tooltip } from "./Tooltip";

export const PlayerControlPanel: FC = () => {
  const [isAttackButtonHovered, setIsAttackButtonHovered] = useState(false);

  const { turnCycle, endTurn, isRoomOver } = useGameStateStore();

  const { setPlayerState, getPlayer, getPlayerBonusDamage, setPlayer } =
    usePlayerStore();

  const player = getPlayer();

  const bonusDamage = getPlayerBonusDamage();

  const { addLog } = useLogStore();

  const [openSkills, setOpenSkills] = useState(false);

  const handleEndTurnClick = () => {
    setPlayerState({
      isAttacking: false,
      isMoving: false,
      isUsingSkill: false,
    });
    handlePlayerEndTurn(turnCycle, getPlayer, setPlayer, endTurn);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const disabled = useMemo(() => {
    return (
      turnCycle[0] !== null && turnCycle[0].entityType !== ENTITY_TYPE.PLAYER
    );
  }, [turnCycle]);

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
        {openSkills ? (
          <>
            {player.skills.map((skill) => (
              <Button
                key={skill.name}
                onClick={() => {
                  setPlayerState({
                    isAttacking: false,
                    isMoving: false,
                    isUsingSkill: !player.state.isUsingSkill,
                    skillId: skill.id,
                  });
                }}
                disabled={
                  disabled ||
                  player.actionPoints < skill.cost ||
                  skill.cooldownCounter > 0
                }
              >
                {skill.name}
              </Button>
            ))}
            <Button
              onClick={() => {
                setPlayerState({
                  isAttacking: false,
                  isMoving: false,
                  isUsingSkill: false,
                });
                setOpenSkills(false);
              }}
              disabled={disabled}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <div className="relative">
              <Tooltip active={isAttackButtonHovered}>
                {player.equipment.weapon ? (
                  <>
                    <h2>Weapon attack</h2>
                    <p>Base DMG: {player.equipment.weapon?.damage}</p>
                    <p>Bonus DMG: {bonusDamage}</p>
                    <p>
                      Total DMG: {player.equipment.weapon?.damage + bonusDamage}
                    </p>
                  </>
                ) : (
                  <h2>No weapon equipped</h2>
                )}
              </Tooltip>
              <Button
                onClick={() => {
                  setPlayerState({
                    isAttacking: !player.state.isAttacking,
                    isMoving: false,
                    isUsingSkill: false,
                  });
                }}
                onMouseEnter={() => setIsAttackButtonHovered(true)}
                onMouseLeave={() => setIsAttackButtonHovered(false)}
                disabled={
                  disabled ||
                  isRoomOver ||
                  player.equipment.weapon === null ||
                  (player.equipment.weapon &&
                    player.actionPoints < player.equipment.weapon.cost)
                }
              >
                Attack
              </Button>
            </div>

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
                setOpenSkills(true);
              }}
              disabled={disabled || isRoomOver}
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
              disabled={disabled || isRoomOver}
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
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = ({ children, onClick, disabled, onMouseEnter, onMouseLeave }) => {
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
};
