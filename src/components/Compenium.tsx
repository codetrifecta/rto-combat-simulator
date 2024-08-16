import { FC } from 'react';
import { SKILLS } from '../constants/skill';
import { Icon } from './Icon';

const ICON_SIZE = 50;

export const Compendium: FC = () => {
  return (
    <div className="bg-zinc-900 p-5 border border-white h-full w-full">
      <h1 className="mb-3">Compendium</h1>

      <div className="mb-3">
        <h2>Available skills</h2>
        <div
          className={`grid gap-1 grid-cols-6`}
          style={{
            gridTemplateRows: `repeat(${Math.ceil(SKILLS.length / 6)}, ${ICON_SIZE}px)`,
          }}
        >
          {SKILLS.map((skill, index) => (
            <div
              key={index}
              id={`compendium_skill_slot_${index + 1}`}
              className="bg-gray-500"
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            >
              <Icon icon={skill.icon} width={ICON_SIZE} height={ICON_SIZE} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Equipped skills</h2>
        <div className="flex gap-1 justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              id={`compendium_skill_slot_${index + 1}`}
              className="bg-gray-500"
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
