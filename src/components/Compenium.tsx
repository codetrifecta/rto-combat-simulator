import { FC, useState } from 'react';
import {
  intelligenceBasedSkillIDs,
  SKILL_TAG,
  SKILLS,
  strengthBasedSkillIDs,
} from '../constants/skill';
import { Icon } from './Icon';
import { ISkill } from '../types';
import { IconButton } from './IconButton';
import { Tooltip } from './Tooltip';
import { useGameStateStore } from '../store/game';

const ICON_SIZE = 50;

export const Compendium: FC = () => {
  const [equippedSkills, setEquippedSkills] = useState<ISkill[]>([]);

  const { setIsCompendiumOpen } = useGameStateStore();

  const renderSkillButtonTooltip = (skill: ISkill) => {
    const tagString = skill.tags
      .map((tag) => {
        switch (tag) {
          case SKILL_TAG.SINGLE_TARGET:
            return 'Single Target';
          case SKILL_TAG.AOE:
            return 'AoE';
          default: {
            const tagString = tag.replace(/_/g, ' ');
            return tagString.charAt(0).toUpperCase() + tagString.slice(1);
          }
        }
      })
      .join(', ');

    // Strength-based skills vs Intelligence-based skills
    if (strengthBasedSkillIDs.includes(skill.id)) {
      return (
        <Tooltip>
          <h2>{skill.name}</h2>
          <p>{tagString}</p>
          <p>{skill.description}</p>
          <p>Damage Multiplier: STR * {skill.damageMultiplier}</p>
          <p>Range: {skill.range}</p>
          <p>Cost: {skill.cost} AP</p>
          <p>Cooldown: {skill.cooldown} turns</p>
        </Tooltip>
      );
    } else if (intelligenceBasedSkillIDs.includes(skill.id)) {
      return (
        <Tooltip>
          <h2>{skill.name}</h2>
          <p>{tagString}</p>
          <p>{skill.description}</p>
          <p>Damage Multiplier: INT * {skill.damageMultiplier}</p>
          <p>Range: {skill.range}</p>
          <p>Cost: {skill.cost} AP</p>
          <p>Cooldown: {skill.cooldown} turns</p>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip>
          <h2>{skill.name}</h2>
          <p>{tagString}</p>
          <p>{skill.description}</p>
          <p>Cost: {skill.cost} AP</p>
          <p>Cooldown: {skill.cooldown} turns</p>
        </Tooltip>
      );
    }
  };

  const addToEquippedSkills = (skill: ISkill) => {
    if (equippedSkills.length >= 6) return;

    setEquippedSkills((prevEquippedSkills) => [...prevEquippedSkills, skill]);
  };

  const removeFromEquippedSkills = (skill: ISkill) => {
    setEquippedSkills((prevEquippedSkills) => {
      const newEquippedSkills = prevEquippedSkills.filter(
        (equippedSkill) =>
          equippedSkill !== null && equippedSkill.id !== skill.id
      );

      return newEquippedSkills;
    });
  };

  return (
    <div className="bg-zinc-900 p-5 border border-white h-full w-full">
      <div className="relative">
        <div
          className="absolute top-0 right-0 cursor-pointer text-red-500"
          onClick={() => setIsCompendiumOpen(false)}
        >
          X
        </div>
        <h2 className="mb-5 pb-3 w-full border-b">Compendium</h2>
      </div>

      <div className="mb-5">
        <h3 className="mb-3">Available skills</h3>
        <div
          className={`grid gap-1 grid-cols-6`}
          style={{
            gridTemplateRows: `repeat(${Math.ceil(SKILLS.length / 6)}, ${ICON_SIZE}px)`,
          }}
        >
          {SKILLS.map((skill, index) => (
            <div
              key={'available_skill_' + index}
              id={`compendium_skill_${index + 1}`}
              className="bg-gray-500 relative"
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            >
              {skill !== null && (
                <>
                  <IconButton
                    onClick={() => addToEquippedSkills(skill)}
                    disabled={
                      equippedSkills.find((equippedSkill) => {
                        if (equippedSkill === null) return;
                        return equippedSkill.name === skill.name;
                      })
                        ? true
                        : false
                    }
                  >
                    <Icon
                      icon={skill.icon}
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                    />
                  </IconButton>
                  {renderSkillButtonTooltip(skill)}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3">Equipped skills</h3>
        <div className="flex gap-1 justify-center">
          {equippedSkills.map((skill, index) => (
            <div
              key={'equipped_skill_' + index}
              id={`compendium_skill_slot_${index + 1}`}
              className="bg-gray-500 relative"
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            >
              {skill !== null && (
                <>
                  <IconButton onClick={() => removeFromEquippedSkills(skill)}>
                    <Icon
                      icon={skill.icon}
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                    />
                  </IconButton>
                  {renderSkillButtonTooltip(skill)}
                </>
              )}
            </div>
          ))}
          {Array.from({ length: 6 - equippedSkills.length }).map((_, index) => (
            <div
              key={index}
              id={`compendium_skill_slot_${equippedSkills.length + index + 1}`}
              className="bg-gray-500"
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
