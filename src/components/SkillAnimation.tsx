import { FC, useEffect } from 'react';
import { useSkillAnimationStore } from '../store/skillAnimation';
import { TILE_SIZE } from '../constants/tile';
import { Sprite } from './Sprite';

export const SkillAnimation: FC = () => {
  const { currentSkillAnimation, setCurrentSkillAnimation } =
    useSkillAnimationStore();

  useEffect(() => {
    console.log('do current SkillAnimation');

    if (!currentSkillAnimation) {
      return;
    }

    setTimeout(() => {
      console.log('SkillAnimation done');
      setCurrentSkillAnimation(null);
    }, currentSkillAnimation.duration * 900);
  }, [currentSkillAnimation, setCurrentSkillAnimation]);

  return (
    <div
      className="absolute z-[120] pointer-events-none"
      style={{
        top: currentSkillAnimation
          ? currentSkillAnimation.position[0] * TILE_SIZE
          : 0,
        left: currentSkillAnimation
          ? currentSkillAnimation.position[1] * TILE_SIZE
          : 0,
      }}
    >
      {currentSkillAnimation !== null ? (
        <div
          className="absolute overflow-hidden"
          style={{
            width: currentSkillAnimation.spriteSize,
            height: currentSkillAnimation.spriteSize,
            transform: `translate(${-currentSkillAnimation.spriteSize / 2 + TILE_SIZE / 2}px, ${-currentSkillAnimation.spriteSize / 2 + TILE_SIZE / 2 + (currentSkillAnimation.yOffset !== undefined ? currentSkillAnimation.yOffset : 0)}px)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width:
                currentSkillAnimation.spriteSize *
                currentSkillAnimation.spritesheetColumns,
              height:
                currentSkillAnimation.spriteSize *
                currentSkillAnimation.spritesheetRows,
              top:
                -currentSkillAnimation.spriteSize *
                currentSkillAnimation.animationRow,
              left: 0,
              animationName: 'leftToRightSpritesheet',
              animationDuration: `${currentSkillAnimation.duration}s`,
              animationTimingFunction: `steps(${currentSkillAnimation.spritesheetColumns})`,
              animationIterationCount: 'forwards',
            }}
          >
            <Sprite
              id="SkillAnimation_animation"
              sprite={currentSkillAnimation.sprite}
              width={
                currentSkillAnimation.spriteSize *
                currentSkillAnimation.spritesheetColumns
              }
              height={
                currentSkillAnimation.spriteSize *
                currentSkillAnimation.spritesheetRows
              }
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
