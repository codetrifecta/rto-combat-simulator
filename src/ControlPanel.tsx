import { type FC } from "react";

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
  playerState: {
    isAttacking: boolean;
    isMoving: boolean;
    isUsingSkill: boolean;
    isEndingTurn: boolean;
  };
  setPlayerState: (state: {
    isAttacking: boolean;
    isMoving: boolean;
    isUsingSkill: boolean;
    isEndingTurn: boolean;
  }) => void;
}> = ({ playerState, setPlayerState }) => {
  return (
    <div className="bg-white w-full p-2 flex justify-center items-center gap-5 absolute bottom-[50px]">
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
                isEndingTurn: false,
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
                isEndingTurn: false,
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
                isEndingTurn: false,
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
                isEndingTurn: false,
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
                isEndingTurn: true,
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
