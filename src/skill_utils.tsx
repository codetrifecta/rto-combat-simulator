import { ENTITY_TYPE } from './constants/entity';
import {
  intelligenceBasedSkillIDs,
  SKILL_ID,
  SKILL_TAG,
} from './constants/skill';
import { BASE_STATUS_EFFECTS, STATUS_ID, STATUSES } from './constants/status';
import { IEnemy, ILog, IPlayer, ISkill, IStatus, IStatusEffect } from './types';
import {
  damageEntity,
  displayStatusEffect,
  getEntityPosition,
  getPlayerLifestealMultiplier,
  getPlayerTotalDefense,
  getPlayerTotalIntelligence,
  getPlayerTotalStrength,
  healEntity,
} from './utils';

export const handleSkill = (
  skill: ISkill,
  clickedTilePosition: [number, number],
  player: IPlayer,
  enemies: IEnemy[],
  targetZones: [number, number][],
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>,
  addLog: (log: ILog) => void
) => {
  let newPlayer = { ...player };
  let newEnemies = [...enemies];
  const newRoomEntityPositions = new Map(roomEntityPositions);

  let targets: [ENTITY_TYPE, number][] = [];

  // Log skill usage
  addLog({
    message: (
      <>
        <span className="text-green-500">{player.name}</span> used{' '}
        <span className="text-blue-500">{skill.name}</span>
      </>
    ),
    type: 'info',
  });

  // RI: each skill can only have AT MOST one of the following tags: SELF, SINGLE_TARGET, or AOE
  // Pure movement skills like Fly have neither of these tags
  if (skill.tags.includes(SKILL_TAG.SELF)) {
    targets = [[player.entityType, player.id]];
  } else if (skill.tags.includes(SKILL_TAG.SINGLE_TARGET)) {
    targets = getSingleTargetSkillTarget(
      clickedTilePosition,
      roomEntityPositions
    );
  } else if (skill.tags.includes(SKILL_TAG.AOE)) {
    targets = getAOESkillTargets(targetZones, roomEntityPositions);
  }

  if (skill.tags.includes(SKILL_TAG.DAMAGE)) {
    const { playerAfterDamage, enemiesAfterDamage } = handleSkillDamage(
      skill,
      newPlayer,
      newEnemies,
      targets,
      addLog
    );

    newPlayer = playerAfterDamage;
    newEnemies = [...enemiesAfterDamage];
  }

  if (skill.tags.includes(SKILL_TAG.STATUS)) {
    const { playerAfterStatus, enemiesAfterStatus } = handleSkillStatus(
      skill,
      newPlayer,
      newEnemies,
      targets,
      addLog
    );

    newPlayer = playerAfterStatus;
    newEnemies = [...enemiesAfterStatus];
  }

  if (skill.tags.includes(SKILL_TAG.MOVEMENT)) {
    // Move player to clicked tile position

    const [playerRow, playerCol] = getEntityPosition(
      player,
      newRoomEntityPositions
    );

    if (playerRow === -1 || playerCol === -1) {
      console.error('handleSkill movement: Player position not found');
      return {
        newPlayer: player,
        newEnemies: enemies,
        newRoomEntityPositions: roomEntityPositions,
      };
    }

    newRoomEntityPositions.delete(
      `${playerRow},${playerCol}` // Remove player from old position
    );

    newRoomEntityPositions.set(
      `${clickedTilePosition[0]},${clickedTilePosition[1]}`,
      [ENTITY_TYPE.PLAYER, player.id]
    );

    // Log movement
    addLog({
      message: (
        <>
          <span className="text-green-500">{player.name}</span> moved to tile{' '}
          {`(${clickedTilePosition[0]}, ${clickedTilePosition[1]})`}
        </>
      ),
      type: 'info',
    });
  }

  return { newPlayer, newEnemies, newRoomEntityPositions };
};

const getSingleTargetSkillTarget = (
  clickedTilePosition: [number, number],
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>
): [ENTITY_TYPE, number][] => {
  const entityIfExists = roomEntityPositions.get(
    `${clickedTilePosition[0]},${clickedTilePosition[1]}`
  );

  if (entityIfExists) {
    const [entityType, entityId] = entityIfExists;
    if (entityType === ENTITY_TYPE.ENEMY) {
      return [[ENTITY_TYPE.ENEMY, entityId]];
    } else {
      console.error(
        'handleSkillSingleTarget: No enemy found at clicked tile position'
      );

      return [];
    }
  } else {
    console.error(
      'handleSkillSingleTarget: No entity found at clicked tile position'
    );

    return [];
  }
};

const getAOESkillTargets = (
  targetZones: [number, number][],
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>
) => {
  const entitiesInTargetZone: [ENTITY_TYPE, number][] = [];

  targetZones.forEach(([row, col]) => {
    const entitiyIfExists = roomEntityPositions.get(`${row},${col}`);

    if (!entitiyIfExists) {
      return;
    }

    entitiesInTargetZone.push(entitiyIfExists);
  });

  return entitiesInTargetZone;
};

const handleSkillDamage = (
  skill: ISkill,
  player: IPlayer,
  enemies: IEnemy[],
  targets: [ENTITY_TYPE, number][],
  addLog: (log: ILog) => void
) => {
  const playerAfterDamage: IPlayer = { ...player };
  const enemiesAfterDamage: IEnemy[] = [...enemies];
  const playerTotalStrength = getPlayerTotalStrength(player);
  const playerTotalIntelligence = getPlayerTotalIntelligence(player);
  const playerTotalDefense = getPlayerTotalDefense(player);
  const playerLifestealMultiplier = getPlayerLifestealMultiplier(player);

  let totalDamage = 0;

  if (intelligenceBasedSkillIDs.includes(skill.id)) {
    totalDamage += Math.round(skill.damageMultiplier * playerTotalIntelligence);
  } else {
    totalDamage += Math.round(skill.damageMultiplier * playerTotalStrength);
  }

  targets.forEach((target) => {
    const entityType = target[0];
    const entityId = target[1];

    if (entityType === ENTITY_TYPE.ENEMY) {
      const enemy = enemiesAfterDamage.find((e) => e.id === entityId);

      if (!enemy) {
        console.error('handleSkillDamage: Enemy not found in enemies list');
        return;
      }

      // Find enemy index
      const enemyIndex = enemiesAfterDamage.findIndex((e) => e.id === enemy.id);

      const newEnemy = { ...enemy };

      // Peform skill specific actions before applying to targets
      if ([SKILL_ID.EXECUTE].includes(skill.id)) {
        // Execute: Deal double damage if enemy health is below 25%
        if (newEnemy.health < newEnemy.maxHealth * 0.25) {
          totalDamage *= 2;
        }
      } else if ([SKILL_ID.HIDDEN_BLADE].includes(skill.id)) {
        // Hidden Blade / Shadow Strike: Deal double damage if player is hidden
        if (
          playerAfterDamage.statuses.some(
            (status) => status.id === STATUS_ID.HIDDEN
          )
        ) {
          totalDamage *= 2;
        }
      }

      // Calculate damage
      newEnemy.health = damageEntity(
        newEnemy,
        totalDamage,
        `tile_${newEnemy.entityType}_${newEnemy.id}`
      );
      // newEnemy.health = newEnemy.health - totalDamage;

      if (playerLifestealMultiplier > 0) {
        // Limit lifesteal to the enemy's remaining health
        let lifestealAmount = Math.round(
          (totalDamage > enemy.health ? enemy.health : totalDamage) *
            playerLifestealMultiplier
        );

        if (
          playerAfterDamage.health + lifestealAmount >
          playerAfterDamage.maxHealth
        ) {
          lifestealAmount =
            playerAfterDamage.maxHealth - playerAfterDamage.health;
        }

        playerAfterDamage.health = healEntity(
          playerAfterDamage,
          lifestealAmount,
          `tile_${player.entityType}_${player.id}`
        );
      }

      // Perform skill specific actions
      switch (skill.id) {
        case SKILL_ID.ABSORB:
          {
            // Absorb damage dealt as health (or the rest of the enemy's health if it's less than the damage dealt)
            let lifestealAmount = Math.round(
              totalDamage > enemy.health ? enemy.health : totalDamage
            );

            if (
              playerAfterDamage.health + lifestealAmount >
              playerAfterDamage.maxHealth
            ) {
              lifestealAmount =
                playerAfterDamage.maxHealth - playerAfterDamage.health;
            }

            playerAfterDamage.health = healEntity(
              playerAfterDamage,
              lifestealAmount,
              `${player.entityType}_${player.id}`
            );
          }
          break;
        default:
          break;
      }

      // Log damage
      if (newEnemy.health <= 0) {
        // For Execute skill, player gains 2 AP if enemy is defeated
        if ([SKILL_ID.EXECUTE].includes(skill.id)) {
          playerAfterDamage.actionPoints += 2;
        }

        // enemiesAfterDamage.splice(enemyIndex, 1);

        addLog({
          message: (
            <>
              <span className="text-red-500">{newEnemy.name}</span> took{' '}
              {totalDamage} damage and has been defeated!
            </>
          ),
          type: 'info',
        });
      } else {
        addLog({
          message: (
            <>
              <span className="text-red-500">{newEnemy.name}</span> took{' '}
              {totalDamage} damage.
            </>
          ),
          type: 'info',
        });
      }
      enemiesAfterDamage[enemyIndex] = newEnemy;

      // eslint-disable-next-line no-empty
    } else if (entityType === ENTITY_TYPE.PLAYER) {
      // Peform skill specific actions when applying to targets
      // Leap Slam, Flame Dive: Player never gets damaged (because they are supposed to be diving into the new position)
      if ([SKILL_ID.LEAP_SLAM, SKILL_ID.FLAME_DIVE].includes(skill.id)) {
        return; // Skip applying status to player
      }

      // If player has 10 DEF, then player takes 10% less damage
      const playerDamageTakenMultiplier = 1 - playerTotalDefense / 100;

      // Calculate damage dealt to player
      let totalDamageToPlayer = Math.round(
        totalDamage * playerDamageTakenMultiplier
      );

      if (totalDamageToPlayer < 0) {
        totalDamageToPlayer = 0;
      }

      playerAfterDamage.health = damageEntity(
        playerAfterDamage,
        totalDamageToPlayer,
        `tile_${playerAfterDamage.entityType}_${playerAfterDamage.id}`
      );
      // playerAfterDamage.health = playerAfterDamage.health - totalDamageToPlayer;

      // Log damage
      if (playerAfterDamage.health <= 0) {
        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> took{' '}
              {totalDamageToPlayer} damage and has been defeated!
            </>
          ),
          type: 'info',
        });
      } else {
        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> took{' '}
              {totalDamageToPlayer} damage.
            </>
          ),
          type: 'info',
        });
      }
    }
  });

  // Remove hidden status from player if enemy is attacked
  if (
    playerAfterDamage.statuses.some((status) => status.id === STATUS_ID.HIDDEN)
  ) {
    playerAfterDamage.statuses = playerAfterDamage.statuses.filter(
      (status) => status.id !== STATUS_ID.HIDDEN
    );

    const statusToBeRemoved = STATUSES.find(
      (status) => status.id === STATUS_ID.HIDDEN
    );

    if (statusToBeRemoved === undefined) {
      console.error(
        'handleSkillDamage: No status found for the associated skill ID'
      );
    } else {
      displayStatusEffect(
        statusToBeRemoved,
        false,
        `tile_${playerAfterDamage.entityType}_${playerAfterDamage.id}`
      );
    }
  }

  return { playerAfterDamage, enemiesAfterDamage };
};

const handleSkillStatus = (
  skill: ISkill,
  player: IPlayer,
  enemies: IEnemy[],
  targets: [ENTITY_TYPE, number][],
  addLog: (log: ILog) => void
) => {
  const playerAfterStatus: IPlayer = { ...player };
  const enemiesAfterStatus: IEnemy[] = [...enemies];
  let statusID: STATUS_ID | -1 = -1;

  // First value is a boolean to determine if the status effect modifier should be applied
  // Second value is the status effect modifier to be applied
  const statusEffectModifier: [boolean, IStatusEffect] = [
    false,
    BASE_STATUS_EFFECTS,
  ];

  switch (skill.id) {
    case SKILL_ID.IRONFLESH:
      statusID = STATUS_ID.STONE_SKIN;
      break;
    case SKILL_ID.FLEX:
      statusID = STATUS_ID.FLEXED;
      break;
    case SKILL_ID.ENLIGHTEN:
      statusID = STATUS_ID.ENLIGHTENED;
      break;
    case SKILL_ID.FOCUS:
      statusID = STATUS_ID.FOCUSED;
      break;
    case SKILL_ID.FIREBALL:
    case SKILL_ID.FLAME_DIVE:
      statusID = STATUS_ID.BURNED;
      // DoT will scale with player's intelligence
      statusEffectModifier[0] = true;
      statusEffectModifier[1].damageOverTime = Math.ceil(
        0.1 * getPlayerTotalIntelligence(playerAfterStatus)
      );
      break;
    case SKILL_ID.GORGONS_GAZE:
      statusID = STATUS_ID.PETRIFIED;
      break;
    case SKILL_ID.FREEZE:
      statusID = STATUS_ID.FROZEN;
      break;
    case SKILL_ID.BLOODLUST:
      statusID = STATUS_ID.BLOODLUST;
      break;
    case SKILL_ID.DISABLE:
      statusID = STATUS_ID.DISABLED;
      break;
    case SKILL_ID.ENTANGLE:
      statusID = STATUS_ID.ENTANGLED;
      break;
    case SKILL_ID.WEAKEN:
      statusID = STATUS_ID.WEAKENED;
      break;
    case SKILL_ID.WARCRY:
      statusID =
        targets.length > 3
          ? STATUS_ID.BATTLE_FURY_3
          : targets.length > 1
            ? STATUS_ID.BATTLE_FURY_2
            : STATUS_ID.BATTLE_FURY_1;
      break;
    case SKILL_ID.HIDE:
      statusID = STATUS_ID.HIDDEN;
      break;
    case SKILL_ID.HIDDEN_BLADE:
      statusID = STATUS_ID.BLEEDING;
      // DoT will scale with player's strength
      statusEffectModifier[0] = true;
      statusEffectModifier[1].damageOverTime = Math.ceil(
        0.1 * getPlayerTotalStrength(playerAfterStatus)
      );
      break;
    case SKILL_ID.SWIFT_MOVEMENT:
      statusID = STATUS_ID.SWIFTNESS;
      break;
    default:
      break;
  }

  const statusToBeApplied: IStatus | undefined = STATUSES.find(
    (status) => status.id === statusID
  );

  if (!statusToBeApplied) {
    console.error(
      'handleSkillStatus: No status found for the associated skill ID'
    );

    return { playerAfterStatus, enemiesAfterStatus: [] };
  }

  // Apply any status effect modifiers
  if (statusEffectModifier[0]) {
    statusToBeApplied.effect = {
      ...statusToBeApplied.effect,
      ...statusEffectModifier[1],
    };
  }

  if ([STATUS_ID.BURNED, STATUS_ID.BLEEDING].includes(statusToBeApplied.id)) {
    statusToBeApplied.description = statusToBeApplied.description.replace(
      '#DAMAGE',
      statusToBeApplied.effect.damageOverTime + ''
    );
  }

  // Peform skill specific actions before applying to targets
  // Warcry: Apply status to player
  if (skill.id === SKILL_ID.WARCRY) {
    playerAfterStatus.statuses = [
      ...playerAfterStatus.statuses,
      statusToBeApplied,
    ];

    addLog({
      message: (
        <>
          <span className="text-green-500">{playerAfterStatus.name}</span> now
          has status{' '}
          <span className="text-yellow-500">{statusToBeApplied.name}</span>.
        </>
      ),
      type: 'info',
    });

    displayStatusEffect(
      statusToBeApplied,
      true,
      `tile_${playerAfterStatus.entityType}_${playerAfterStatus.id}`
    );

    return { playerAfterStatus, enemiesAfterStatus };
  }

  targets.forEach((target) => {
    const entityType = target[0];
    const entityId = target[1];

    if (entityType === ENTITY_TYPE.ENEMY) {
      const enemy = enemiesAfterStatus.find((e) => e.id === entityId);

      if (!enemy) {
        console.error('handleSkillStatus: Enemy not found in enemies list');
        return;
      }

      if (statusToBeApplied) {
        // Find enemy index
        const enemyIndex = enemiesAfterStatus.findIndex(
          (e) => e.id === enemy.id
        );

        const newEnemy = { ...enemy };

        // Only apply status if enemy does not already have it
        if (
          !newEnemy.statuses.some(
            (status) => status.id === statusToBeApplied.id
          )
        ) {
          newEnemy.statuses = [...newEnemy.statuses, statusToBeApplied];

          addLog({
            message: (
              <>
                <span className="text-red-500">{newEnemy.name}</span> now has
                status{' '}
                <span className="text-yellow-500">
                  {statusToBeApplied.name}
                </span>
                .
              </>
            ),
            type: 'info',
          });
        }

        displayStatusEffect(
          statusToBeApplied,
          true,
          `tile_${newEnemy.entityType}_${newEnemy.id}`
        );

        enemiesAfterStatus[enemyIndex] = newEnemy;
      }
    } else if (entityType === ENTITY_TYPE.PLAYER) {
      // Peform skill specific actions when applying to targets
      // Flame Dive: Player never gets burned (because they are supposed to be diving into the new position)
      if (skill.id === SKILL_ID.FLAME_DIVE) {
        return; // Skip applying status to player
      }

      if (statusToBeApplied) {
        playerAfterStatus.statuses = [
          ...playerAfterStatus.statuses,
          statusToBeApplied,
        ];

        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> now has
              status{' '}
              <span className="text-yellow-500">{statusToBeApplied.name}</span>.
            </>
          ),
          type: 'info',
        });

        displayStatusEffect(
          statusToBeApplied,
          true,
          `tile_${playerAfterStatus.entityType}_${playerAfterStatus.id}`
        );
      }
    }
  });

  return { playerAfterStatus, enemiesAfterStatus };
};
