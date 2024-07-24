import { ENTITY_TYPE } from './constants/entity';
import {
  intelligenceBasedSkillIDs,
  SKILL_ID,
  SKILL_TAG,
} from './constants/skill';
import { STATUS_ID, STATUSES } from './constants/status';
import { IEnemy, ILog, IPlayer, ISkill, IStatus } from './types';
import {
  getPlayerLifestealMultiplier,
  getPlayerTotalDefense,
  getPlayerTotalIntelligence,
  getPlayerTotalStrength,
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

    console.log('enemies after damage', enemiesAfterDamage);

    newPlayer = playerAfterDamage;
    newEnemies = [...enemiesAfterDamage];
  }

  console.log('newEnemies after damage', newEnemies);

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

  console.log('newEnemies after status', newEnemies);

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
  addLog({
    message: (
      <>
        <span className="text-green-500">{player.name}</span> used{' '}
        <span className="text-blue-500">{skill.name}</span>
      </>
    ),
    type: 'info',
  });

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

      // Calculate damage
      newEnemy.health = newEnemy.health - totalDamage;

      if (playerLifestealMultiplier > 0) {
        // Limit lifesteal to the enemy's remaining health
        const lifestealAmount = Math.round(
          (totalDamage > enemy.health ? enemy.health : totalDamage) *
            playerLifestealMultiplier
        );

        if (
          playerAfterDamage.health + lifestealAmount >
          playerAfterDamage.maxHealth
        ) {
          playerAfterDamage.health = playerAfterDamage.maxHealth;
        } else {
          playerAfterDamage.health += lifestealAmount;
        }
      }

      // Perform skill specific actions
      switch (skill.id) {
        case SKILL_ID.ABSORB:
          {
            // Absorb damage dealt as health (or the rest of the enemy's health if it's less than the damage dealt)
            const lifestealAmount = Math.round(
              totalDamage > enemy.health ? enemy.health : totalDamage
            );

            if (
              playerAfterDamage.health + lifestealAmount >
              playerAfterDamage.maxHealth
            ) {
              playerAfterDamage.health = playerAfterDamage.maxHealth;
            } else {
              playerAfterDamage.health += lifestealAmount;
            }
          }
          break;
        default:
          break;
      }

      // Log damage
      if (newEnemy.health <= 0) {
        enemiesAfterDamage.splice(enemyIndex, 1);
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
        enemiesAfterDamage[enemyIndex] = newEnemy;
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

      // eslint-disable-next-line no-empty
    } else if (entityType === ENTITY_TYPE.PLAYER) {
      // Calculate damage dealt to player
      totalDamage -= playerTotalDefense;

      if (totalDamage < 0) {
        totalDamage = 0;
      }

      playerAfterDamage.health = playerAfterDamage.health - totalDamage;

      // Log damage
      if (playerAfterDamage.health <= 0) {
        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> took{' '}
              {totalDamage} damage and has been defeated!
            </>
          ),
          type: 'info',
        });
      } else {
        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> took{' '}
              {totalDamage} damage.
            </>
          ),
          type: 'info',
        });
      }
    }
  });

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

  console.log('handleSkillStatus: enemies', enemiesAfterStatus);

  let statusID: STATUS_ID | -1 = -1;

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

  // Peform skill specific actions
  // Warcry: Apply status to player
  if (skill.id === SKILL_ID.WARCRY) {
    playerAfterStatus.statuses = [
      ...playerAfterStatus.statuses,
      statusToBeApplied,
    ];

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
                <span className="text-green-500">{player.name}</span> used{' '}
                <span className="text-blue-500">{skill.name}</span> on{' '}
                <span className="text-red-500">{newEnemy.name}</span> and it now
                has status{' '}
                <span className="text-yellow-500">
                  {statusToBeApplied.name}
                </span>
                .
              </>
            ),
            type: 'info',
          });
        }

        enemiesAfterStatus[enemyIndex] = newEnemy;
      }
    } else if (entityType === ENTITY_TYPE.PLAYER) {
      if (statusToBeApplied) {
        playerAfterStatus.statuses = [
          ...playerAfterStatus.statuses,
          statusToBeApplied,
        ];

        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> used{' '}
              <span className="text-blue-500">{skill.name}</span> and now has
              status{' '}
              <span className="text-yellow-500">{statusToBeApplied.name}</span>.
            </>
          ),
          type: 'info',
        });
      }
    }
  });

  return { playerAfterStatus, enemiesAfterStatus };
};
