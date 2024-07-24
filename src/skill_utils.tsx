import { ENTITY_TYPE } from './constants/entity';
import {
  intelligenceBasedSkillIDs,
  SKILL_ID,
  SKILL_TAG,
} from './constants/skill';
import { STATUS_ID, STATUSES } from './constants/status';
import { IEnemy, ILog, IPlayer, ISkill, IStatus } from './types';
import { getPlayerTotalIntelligence, getPlayerTotalStrength } from './utils';

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

  let targets: (IPlayer | IEnemy)[] = [];

  // RI: each skill can only have AT MOST one of the following tags: SELF, SINGLE_TARGET, or AOE
  // Pure movement skills like fly have neither of these tags
  if (skill.tags.includes(SKILL_TAG.SELF)) {
    targets = [player];
  } else if (skill.tags.includes(SKILL_TAG.SINGLE_TARGET)) {
    targets = handleSkillSingleTarget(
      clickedTilePosition,
      newEnemies,
      roomEntityPositions
    );
  } else if (skill.tags.includes(SKILL_TAG.AOE)) {
    targets = handleSkillAOE(targetZones, newEnemies, roomEntityPositions);
  }

  //   Add log for skill usage
  // addLog({
  //   message: (
  //     <>
  //       <span className="text-green-500">{player.name}</span> used{' '}
  //       <span className="text-green-500">{skill.name}</span>.
  //     </>
  //   ),
  //   type: 'info',
  // });

  if (skill.tags.includes(SKILL_TAG.DAMAGE)) {
    handleSkillDamage(skill, newPlayer, enemies, targets, addLog);
  }

  if (skill.tags.includes(SKILL_TAG.STATUS)) {
    const { playerAfterStatus, enemiesAfterStatus } = handleSkillStatus(
      skill,
      newPlayer,
      enemies,
      targets,
      addLog
    );

    newPlayer = playerAfterStatus;
    newEnemies = enemiesAfterStatus;
  }

  return { newPlayer, newEnemies, newRoomEntityPositions };
};

const handleSkillSingleTarget = (
  clickedTilePosition: [number, number],
  enemies: IEnemy[],
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>
): (IPlayer | IEnemy)[] => {
  const entityIfExists = roomEntityPositions.get(
    `${clickedTilePosition[0]},${clickedTilePosition[1]}`
  );

  if (entityIfExists) {
    const [entityType, entityId] = entityIfExists;
    if (entityType === ENTITY_TYPE.ENEMY) {
      const enemy = enemies.find((e) => e.id === entityId);
      if (enemy) {
        return [enemy];
      } else {
        console.error(
          'handleSkillSingleTarget: No enemy with the associated ID found at clicked tile position'
        );

        return [];
      }
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

const handleSkillAOE = (
  targetZones: [number, number][],
  enemies: IEnemy[],
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>
) => {
  const enemiesInTargetZones: IEnemy[] = [];
  targetZones.forEach(([row, col]) => {
    const entitiyIfExists = roomEntityPositions.get(`${row},${col}`);

    if (entitiyIfExists && entitiyIfExists[0] === ENTITY_TYPE.ENEMY) {
      const enemy = enemies.find((e) => e.id === entitiyIfExists[1]);
      if (enemy) {
        enemiesInTargetZones.push(enemy);
      } else {
        console.error(
          'handleSkillAOE: No enemy with the associated ID found at target zone'
        );

        return [];
      }
    }
  });

  return [];
};

const handleSkillDamage = (
  skill: ISkill,
  player: IPlayer,
  enemies: IEnemy[],
  targets: (IPlayer | IEnemy)[],
  addLog: (log: ILog) => void
) => {
  const playerAfterDamage: IPlayer = { ...player };
  const enemiesAfterDamage: IEnemy[] = [...enemies];
  const playerTotalStrength = getPlayerTotalStrength(player);
  const playerTotalIntelligence = getPlayerTotalIntelligence(player);

  let totalDamage = 0;

  if (intelligenceBasedSkillIDs.includes(skill.id)) {
    totalDamage += Math.round(skill.damageMultiplier * playerTotalIntelligence);
  } else {
    totalDamage += Math.round(skill.damageMultiplier * playerTotalStrength);
  }

  targets.forEach((target) => {
    if (target.entityType === ENTITY_TYPE.ENEMY) {
      const enemy = target as IEnemy;
      // Find enemy index
      const enemyIndex = enemiesAfterDamage.findIndex((e) => e.id === enemy.id);

      const newEnemy = { ...enemy };

      // Calculate damage

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
    } else if (target.entityType === ENTITY_TYPE.PLAYER) {
    }
  });

  return { playerAfterDamage, enemiesAfterDamage };
};

const handleSkillStatus = (
  skill: ISkill,
  player: IPlayer,
  enemies: IEnemy[],
  targets: (IPlayer | IEnemy)[],
  addLog: (log: ILog) => void
) => {
  const playerAfterStatus: IPlayer = { ...player };
  const enemiesAfterStatus: IEnemy[] = [...enemies];
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

  targets.forEach((target) => {
    if (target.entityType === ENTITY_TYPE.ENEMY) {
      const enemy = target as IEnemy;
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
    } else if (target.entityType === ENTITY_TYPE.PLAYER) {
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
