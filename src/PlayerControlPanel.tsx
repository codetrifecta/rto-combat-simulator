import { type FC } from "react";
import { PlayerState } from "./types";

const skills: { name: string; damage: number }[] = [
  {
    name: "Fireball",
    damage: 10,
  },
  {
    name: "Heal",
    damage: -10,
  },
  {
    name: "Lightning",
    damage: 15,
  },
];

export const PlayerControlPanel: FC<{
  disabled: boolean;
  playerState: PlayerState;
  setPlayerState: (state: PlayerState) => void;
}> = ({ playerState, setPlayerState }) => {
  return (
    <div className="bg-white w-screen p-4 flex justify-center items-center gap-5 box-border">
      {playerState.isUsingSkill ? (
        <>
          {skills.map((skill) => (
            <Button key={skill.name} onClick={() => console.log(skill.name)}>
              {skill.name}
            </Button>
          ))}
          <Button
            onClick={() =>
              setPlayerState({
                isAttacking: false,
                isMoving: false,
                isUsingSkill: false,
              })
            }
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              setPlayerState({
                isAttacking: true,
                isMoving: false,
                isUsingSkill: false,
              });
            }}
          >
            Attack
          </Button>
          <Button
            onClick={() => {
              setPlayerState({
                isAttacking: false,
                isMoving: true,
                isUsingSkill: false,
              });
            }}
          >
            Move
          </Button>
          <Button
            onClick={() => {
              setPlayerState({
                isAttacking: false,
                isMoving: false,
                isUsingSkill: true,
              });
            }}
          >
            Skills
          </Button>
          <Button
            onClick={() => {
              setPlayerState({
                isAttacking: false,
                isMoving: false,
                isUsingSkill: false,
              });
            }}
          >
            End Turn
          </Button>
        </>
      )}
    </div>
  );
};

const Button: FC<{
  children: string;
  onClick: () => void;
}> = ({ children, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
