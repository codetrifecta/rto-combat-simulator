import { FC, useEffect } from 'react';
import { useEffectStore } from '../store/effect';
import { TILE_SIZE } from '../constants/tile';
import { Sprite } from './Sprite';

export const EffectAnimations: FC = () => {
  const { currentEffect, setCurrentEffect } = useEffectStore();

  useEffect(() => {
    console.log('do current effect');

    if (!currentEffect) {
      return;
    }

    setTimeout(() => {
      console.log('Effect done');
      setCurrentEffect(null);
    }, currentEffect.duration * 900);
  }, [currentEffect, setCurrentEffect]);

  return (
    <div
      className="absolute z-30 pointer-events-none"
      style={{
        top: currentEffect ? currentEffect.position[0] * TILE_SIZE : 0,
        left: currentEffect ? currentEffect.position[1] * TILE_SIZE : 0,
      }}
    >
      {currentEffect !== null ? (
        <div
          className="absolute overflow-hidden"
          style={{
            width: currentEffect.spriteSize,
            height: currentEffect.spriteSize,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width:
                currentEffect.spriteSize * currentEffect.spritesheetColumns,
              height: currentEffect.spriteSize * currentEffect.spritesheetRows,
              top: -currentEffect.spriteSize * currentEffect.effectRow,
              left: 0,
              animationName: 'leftToRightSpritesheet',
              animationDuration: `${currentEffect.duration}s`,
              animationTimingFunction: `steps(${currentEffect.spritesheetColumns})`,
              animationIterationCount: 'forwards',
            }}
          >
            <Sprite
              id="effect_animation"
              sprite={currentEffect.sprite}
              width={
                currentEffect.spriteSize * currentEffect.spritesheetColumns
              }
              height={currentEffect.spriteSize * currentEffect.spritesheetRows}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
