import { useMemo, useState, type FC } from 'react';
import clsx from 'clsx';
import { usePlayerStore } from '../store/player';
import { useGameStateStore } from '../store/game';
import { handlePlayerEndTurn } from '../utils';
import { useLogStore } from '../store/log';
import { Tooltip } from './Tooltip';
import { ISkill } from '../types';
import { Button } from './Button';
import { Icon } from './Icon';
import { ICON_ID } from '../constants/icons';
import { IconButton } from './IconButton';
import { SKILL_ID } from '../constants/skill';
import { ENTITY_TYPE } from '../constants/entity';

const ICON_SIZE = 48;

export const PlayerControlPanel: FC = () => {
  const {
    turnCycle,
    endTurn,
    isRoomOver,
    isGameOver,
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
    getPlayerTotalStrength,
    getPlayerTotalIntelligence,
    getPlayerBonusDamage,
    setPlayer,
    setPlayerState,
  } = usePlayerStore();

  const player = getPlayer();
  const baseAttackDamage = getPlayerBaseAttackDamage();
  const totalStrength = getPlayerTotalStrength();
  const totalIntelligence = getPlayerTotalIntelligence();

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

  const renderSkillButtonTooltip = (skill: ISkill) => {
    // Strength-based skills vs Intelligence-based skills
    if (
      [
        SKILL_ID.WHIRLWIND,
        SKILL_ID.EXECUTE,
        SKILL_ID.CLEAVE,
        SKILL_ID.ANNIHILATE,
      ].includes(skill.id)
    ) {
      return (
        <Tooltip>
          <h2>{skill.name}</h2>
          <p>{skill.description}</p>
          {player.equipment.weapon ? (
            <p>
              Base DMG: {Math.round(totalStrength * skill.damageMultiplier)}
            </p>
          ) : null}
          {player.equipment.weapon ? <p>Bonus DMG: {bonusDamage}</p> : null}
          {player.equipment.weapon ? (
            <p>
              Total DMG:{' '}
              {Math.round(totalStrength * skill.damageMultiplier) + bonusDamage}
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
        <Tooltip>
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
              Total DMG:{' '}
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

  const disabled = useMemo(() => {
    return (
      (turnCycle[0] !== null &&
        turnCycle[0].entityType !== ENTITY_TYPE.PLAYER) ||
      isGameOver
    );
  }, [isGameOver, turnCycle]);

  return (
    <div className="h-[80px] flex items-center bg-neutral-900">
      <div
        className={clsx(
          'w-screen px-4 flex justify-center items-center gap-5 box-border',
          {
            'bg-neutral-900': !disabled,
          }
        )}
      >
        {openSkills ? (
          <div
            className={clsx('flex justify-center items-center', {
              'pointer-events-none': disabled,
            })}
          >
            {player.skills.map((skill) => (
              <div key={skill.id} className="relative">
                <IconButton
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
                    skill.cooldownCounter > 0 ||
                    (skill.id === SKILL_ID.WHIRLWIND &&
                      player.equipment.weapon === null)
                  }
                >
                  <Icon
                    icon={skill.icon}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                </IconButton>
                {renderSkillButtonTooltip(skill)}
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
            <div className="flex justify-center col-span-1">
              <div className="relative">
                <IconButton
                  onClick={() => {
                    if (isGenerateRoomOpen) return;
                    setIsGameLogOpen(!isGameLogOpen);
                  }}
                >
                  <Icon
                    icon={ICON_ID.LOG}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                </IconButton>
                <Tooltip>
                  <p>Game Log (L)</p>
                </Tooltip>
              </div>
              <div className="relative">
                <IconButton
                  onClick={() => {
                    if (isGenerateRoomOpen) return;
                    setIsCharacterSheetOpen(!isCharacterSheetOpen);
                  }}
                >
                  <Icon
                    icon={ICON_ID.CHARACTER}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                </IconButton>
                <Tooltip>
                  <p>Character Sheet (C)</p>
                </Tooltip>
              </div>
              <div className="relative">
                <IconButton
                  onClick={() => {
                    if (isGenerateRoomOpen) return;
                    setIsInventoryOpen(!isInventoryOpen);
                  }}
                >
                  <Icon
                    icon={ICON_ID.INVENTORY}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                </IconButton>
                <Tooltip>
                  <p>Inventory (I)</p>
                </Tooltip>
              </div>
            </div>

            {/* Combat buttons */}
            <div
              className={clsx('flex justify-center items-center col-span-1', {
                'pointer-events-none': disabled,
              })}
            >
              <div className="relative">
                <IconButton
                  onClick={() => {
                    setPlayerState({
                      isAttacking: !player.state.isAttacking,
                      isMoving: false,
                      isUsingSkill: false,
                    });
                  }}
                  disabled={
                    disabled ||
                    isRoomOver ||
                    player.equipment.weapon === null ||
                    (player.equipment.weapon &&
                      player.actionPoints < player.equipment.weapon.cost)
                  }
                >
                  {player.equipment.weapon ? (
                    <Icon
                      icon={player.equipment.weapon.icon}
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                    />
                  ) : (
                    <Icon
                      icon={ICON_ID.BASIC_ATTACK}
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                    />
                  )}
                </IconButton>
                <Tooltip>
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
              </div>

              <div className="relative">
                <IconButton
                  onClick={() => {
                    setPlayerState({
                      isAttacking: false,
                      isMoving: !player.state.isMoving,
                      isUsingSkill: false,
                    });
                  }}
                  disabled={disabled}
                >
                  <Icon
                    icon={ICON_ID.MOVE}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                </IconButton>
                <Tooltip>
                  <h2>Move</h2>
                  <p>Move within a range of 2 tiles.</p>
                  <p>Cost: 1 AP</p>
                  <p></p>
                </Tooltip>
              </div>

              <div className="relative">
                <IconButton
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
                  <Icon
                    icon={ICON_ID.SKILLS}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                </IconButton>
                <Tooltip>
                  <h2>Skills</h2>
                  <p>See available skills</p>
                </Tooltip>
              </div>

              <div className="relative">
                <Button
                  onClick={() => {
                    handleEndTurnClick();
                    addLog({
                      message: (
                        <>
                          <span className="text-green-500">{player.name}</span>{' '}
                          ended their turn.
                        </>
                      ),
                      type: 'info',
                    });
                  }}
                  disabled={disabled || isRoomOver}
                >
                  End Turn
                </Button>
                <Tooltip>
                  <h2>End Turn</h2>
                  <p>End your turn and gain 4 AP</p>
                </Tooltip>
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
