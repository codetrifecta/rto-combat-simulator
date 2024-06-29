// import { useState } from "react";
import { GRID_SIZE } from "../constants";

const className = `h-[${GRID_SIZE}px] w-[${GRID_SIZE}px] border-2 border-gray hover:border-black bg-white cursor-pointer `;

export const Grid = () => {
  //   const selected = useState(false);

  return <div className={className}></div>;
};
