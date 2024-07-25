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
import { ICON_ID } from '../constants/icon';
import { IconButton } from './IconButton';
import { SKILL_ID, strengthBasedSkillIDs } from '../constants/skill';
import { ENTITY_TYPE } from '../constants/entity';
import {
  PLAYER_CONTROL_PANEL_HEIGHT,
  PLAYER_CONTROL_PANEL_ICON_SIZE,
} from '../constants/game';

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
    if (strengthBasedSkillIDs.includes(skill.id)) {
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
    <div
      className="flex justify-center items-center bg-black shadow-lg shadow-white"
      style={{ height: PLAYER_CONTROL_PANEL_HEIGHT }}
    >
      <div
        className={clsx(
          'w-screen px-4 flex justify-center items-center gap-5',
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
                    width={PLAYER_CONTROL_PANEL_ICON_SIZE}
                    height={PLAYER_CONTROL_PANEL_ICON_SIZE}
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
                    width={PLAYER_CONTROL_PANEL_ICON_SIZE}
                    height={PLAYER_CONTROL_PANEL_ICON_SIZE}
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
                    width={PLAYER_CONTROL_PANEL_ICON_SIZE}
                    height={PLAYER_CONTROL_PANEL_ICON_SIZE}
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
                    width={PLAYER_CONTROL_PANEL_ICON_SIZE}
                    height={PLAYER_CONTROL_PANEL_ICON_SIZE}
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
                      width={PLAYER_CONTROL_PANEL_ICON_SIZE}
                      height={PLAYER_CONTROL_PANEL_ICON_SIZE}
                    />
                  ) : (
                    <Icon
                      icon={ICON_ID.BASIC_ATTACK}
                      width={PLAYER_CONTROL_PANEL_ICON_SIZE}
                      height={PLAYER_CONTROL_PANEL_ICON_SIZE}
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
                    width={PLAYER_CONTROL_PANEL_ICON_SIZE}
                    height={PLAYER_CONTROL_PANEL_ICON_SIZE}
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
                    width={PLAYER_CONTROL_PANEL_ICON_SIZE}
                    height={PLAYER_CONTROL_PANEL_ICON_SIZE}
                  />
                </IconButton>
                <Tooltip>
                  <h2>Skills</h2>
                  <p>See available skills</p>
                </Tooltip>
              </div>

              <div className="relative">
                <IconButton
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
                  <Icon
                    icon={ICON_ID.END_TURN}
                    width={PLAYER_CONTROL_PANEL_ICON_SIZE}
                    height={PLAYER_CONTROL_PANEL_ICON_SIZE}
                  />
                </IconButton>
                <Tooltip>
                  <h2>End Turn</h2>
                  <p>End your turn and gain 4 AP</p>
                </Tooltip>
              </div>
            </div>

            {/* Tool buttons */}
            <div className="flex justify-center gap-5 col-span-1">
              <div className="relative">
                <IconButton
                  onClick={() => {
                    setIsCharacterSheetOpen(false);
                    setIsInventoryOpen(false);
                    setIsGenerateRoomOpen(!isGenerateRoomOpen);
                  }}
                >
                  <Icon
                    icon={ICON_ID.GENERATE_ROOM}
                    width={PLAYER_CONTROL_PANEL_ICON_SIZE}
                    height={PLAYER_CONTROL_PANEL_ICON_SIZE}
                  />
                </IconButton>
                <Tooltip>
                  <h2>Generate Room</h2>
                  <p>Customize room layout</p>
                </Tooltip>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
