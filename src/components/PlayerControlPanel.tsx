import { useEffect, useMemo, useState, type FC } from "react";
import clsx from "clsx";
import { usePlayerStore } from "../store/player";
import { useGameStateStore } from "../store/game";
import { ENTITY_TYPE, SKILL_ID } from "../constants";
import { handlePlayerEndTurn } from "../utils";
import { useLogStore } from "../store/log";
import { Tooltip } from "./Tooltip";
import { ISkill } from "../types";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { ICON_ID } from "../icons";
import { IconButton } from "./IconButton";

export const PlayerControlPanel: FC = () => {
  const [isAttackButtonHovered, setIsAttackButtonHovered] = useState(false);
  const [isMoveButtonHovered, setIsMoveButtonHovered] = useState(false);

  const {
    turnCycle,
    endTurn,
    isRoomOver,
    isInventoryOpen,
    isGameLogOpen,
    isCharacterSheetOpen,
    isGenerateRoomOpen,
    setIsCharacterSheetOpen,
    setIsInventoryOpen,
    setIsGameLogOpen,
    setIsGenerateRoomOpen,
  } = useGameStateStore();

  const {
    getPlayer,
    getPlayerBaseAttackDamage,
    getPlayerTotalIntelligence,
    getPlayerBonusDamage,
    setPlayer,
    setPlayerState,
  } = usePlayerStore();

  const player = getPlayer();
  const baseAttackDamage = getPlayerBaseAttackDamage();
  const totalIntelligence = getPlayerTotalIntelligence();

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
            <p>
              Base DMG: {Math.round(baseAttackDamage * skill.damageMultiplier)}
            </p>
          ) : null}
          {player.equipment.weapon ? <p>Bonus DMG: {bonusDamage}</p> : null}
          {player.equipment.weapon ? (
            <p>
              Total DMG:{" "}
              {Math.round(baseAttackDamage * skill.damageMultiplier) +
                bonusDamage}
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
          {skill.damageMultiplier ? (
            <p>
              Base DMG: {Math.round(totalIntelligence * skill.damageMultiplier)}
            </p>
          ) : null}
          {skill.damageMultiplier ? <p>Bonus DMG: {bonusDamage}</p> : null}
          {skill.damageMultiplier ? (
            <p>
              Total DMG:{" "}
              {Math.round(totalIntelligence * skill.damageMultiplier) +
                bonusDamage}
            </p>
          ) : null}
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
    <div className="h-[80px] flex items-center">
      <div
        className={clsx(
          "w-screen p-4 flex justify-center items-center gap-5 box-border",
          { "bg-neutral-900": !disabled }
          // { "opacity-50": disabled }
        )}
      >
        {/* <div>
          SKill Icon:
          <div>
            <Icon icon={ICON_ID.BASIC_ATTACK} width={16} height={16} />
          </div>
        </div> */}
        {openSkills ? (
          <div
            className={clsx("flex justify-center items-center gap-5", {
              "pointer-events-none": disabled,
            })}
          >
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
              neutral
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="grid grid-flow-col grid-rows-1 grid-cols-3 items-center w-full">
            {/* Logger, Character, Inventory buttons */}
            <div className="flex justify-center gap-5 col-span-1">
              <div>
                <Button
                  onClick={() => {
                    setIsGameLogOpen(!isGameLogOpen);
                  }}
                >
                  Log (L)
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setIsCharacterSheetOpen(!isCharacterSheetOpen);
                  }}
                >
                  Character (C)
                </Button>
              </div>
              <Button
                onClick={() => {
                  setIsInventoryOpen(!isInventoryOpen);
                }}
              >
                Inventory (I)
              </Button>
            </div>

            {/* Combat buttons */}
            <div
              className={clsx("flex justify-center gap-5 col-span-1", {
                "pointer-events-none": disabled,
              })}
            >
              <div className="relative">
                <Tooltip active={isAttackButtonHovered}>
                  {player.equipment.weapon ? (
                    <>
                      <h2>Weapon attack</h2>
                      <h3>Weapon Equipped: {player.equipment.weapon.name}</h3>
                      <p>Base DMG: {baseAttackDamage}</p>
                      <p>Bonus DMG: {bonusDamage}</p>
                      <p>Total DMG: {baseAttackDamage + bonusDamage}</p>
                    </>
                  ) : (
                    <h2>No weapon equipped</h2>
                  )}
                </Tooltip>
                <IconButton
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
                  <Icon icon={ICON_ID.BASIC_ATTACK} width={48} height={48} />
                </IconButton>
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

              <div className="relative">
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
              </div>

              <div className="relative">
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
              </div>
            </div>

            {/* Tool buttons */}
            <div className="flex justify-center gap-5 col-span-1">
              <Button
                onClick={() => {
                  setIsCharacterSheetOpen(false);
                  setIsInventoryOpen(false);
                  setIsGenerateRoomOpen(!isGenerateRoomOpen);
                }}
              >
                Generate Room
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
