import { useEffect, useMemo, useState, type FC } from "react";
import clsx from "clsx";
import { usePlayerStore } from "../store/player";
import { useGameStateStore } from "../store/game";
import { ENTITY_TYPE, SKILL_ID } from "../constants";
import { handlePlayerEndTurn } from "../utils";
import { useLogStore } from "../store/log";
import { Tooltip } from "./Tooltip";
import { ISkill } from "../types";

export const PlayerControlPanel: FC = () => {
  const [isAttackButtonHovered, setIsAttackButtonHovered] = useState(false);
  const [isMoveButtonHovered, setIsMoveButtonHovered] = useState(false);

  const { turnCycle, endTurn, isRoomOver } = useGameStateStore();

  const { setPlayerState, getPlayer, getPlayerBonusDamage, setPlayer } =
    usePlayerStore();

  const player = getPlayer();

  const [areSkillButtonsHovered, setAreSkillButtonsHovered] = useState<
    Record<number, boolean>
  >({});

  // Initialize player skill buttons hover state
  useEffect(() => {
    const initialSkillButtonHoverState = player.skills.reduce(
      (acc, skill) => ({ ...acc, [skill.id]: false }),
      {}
    );
    setAreSkillButtonsHovered(initialSkillButtonHoverState);
  }, [player.skills]);

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

  const renderWeaponButtonTooltip = (skill: ISkill) => {
    if (skill.id === SKILL_ID.WHIRLWIND) {
      return (
        <Tooltip active={areSkillButtonsHovered[skill.id]}>
          <h2>{skill.name}</h2>
          <p>{skill.description}</p>
          {player.equipment.weapon ? (
            <p>Base DMG: {player.equipment.weapon.damage + skill.damage}</p>
          ) : null}
          {player.equipment.weapon ? <p>Bonus DMG: {bonusDamage}</p> : null}
          {player.equipment.weapon ? (
            <p>
              Total DMG:{" "}
              {player.equipment.weapon.damage + skill.damage + bonusDamage}
            </p>
          ) : null}
          <p>Cost: {skill.cost} AP</p>
          <p>Cooldown: {skill.cooldown} turns</p>
          {skill.cooldownCounter > 0 && (
            <p>Turns until active: {skill.cooldownCounter}</p>
          )}
        </Tooltip>
      );
    } else {
      return (
        <Tooltip active={areSkillButtonsHovered[skill.id]}>
          <h2>{skill.name}</h2>
          <p>{skill.description}</p>
          {skill.damage ? <p>Base DMG: {skill.damage}</p> : null}
          {skill.damage ? <p>Bonus DMG: {bonusDamage}</p> : null}
          {skill.damage ? <p>Total DMG: {skill.damage + bonusDamage}</p> : null}
          <p>Cost: {skill.cost} AP</p>
          <p>Cooldown: {skill.cooldown} turns</p>
          {skill.cooldownCounter > 0 && (
            <p>Turns until active: {skill.cooldownCounter}</p>
          )}
        </Tooltip>
      );
    }
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
              <div key={skill.id} className="relative">
                {renderWeaponButtonTooltip(skill)}

                <Button
                  onClick={() => {
                    setPlayerState({
                      isAttacking: false,
                      isMoving: false,
                      isUsingSkill: !player.state.isUsingSkill,
                      skillId: skill.id,
                    });
                  }}
                  onMouseEnter={() =>
                    setAreSkillButtonsHovered({
                      ...areSkillButtonsHovered,
                      [skill.id]: true,
                    })
                  }
                  onMouseLeave={() =>
                    setAreSkillButtonsHovered({
                      ...areSkillButtonsHovered,
                      [skill.id]: false,
                    })
                  }
                  disabled={
                    disabled ||
                    player.actionPoints < skill.cost ||
                    skill.cooldownCounter > 0 ||
                    (skill.id === SKILL_ID.WHIRLWIND &&
                      player.equipment.weapon === null)
                  }
                >
                  {skill.name}
                </Button>
              </div>
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
                    <h3>Weapon Equipped: {player.equipment.weapon.name}</h3>
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

            <div className="relative">
              <Tooltip active={isMoveButtonHovered}>
                <h2>Move</h2>
                <p>Move within a range of 2 tiles.</p>
                <p>Cost: 1 AP</p>
                <p></p>
              </Tooltip>
              <Button
                onClick={() => {
                  setPlayerState({
                    isAttacking: false,
                    isMoving: !player.state.isMoving,
                    isUsingSkill: false,
                  });
                }}
                onMouseEnter={() => setIsMoveButtonHovered(true)}
                onMouseLeave={() => setIsMoveButtonHovered(false)}
                disabled={disabled}
              >
                Move
              </Button>
            </div>

            <Button
              onClick={() => {
                setOpenSkills(true);
                setPlayerState({
                  isAttacking: false,
                  isMoving: false,
                  isUsingSkill: false,
                });
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
        { "opacity-50 pointer-event-none cursor-default": disabled }
      )}
      onClick={() => {
        if (!disabled) onClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // disabled={disabled || false}
    >
      {children}
    </button>
  );
};
