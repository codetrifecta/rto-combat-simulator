// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { Grid } from "./components/Grid";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="relative w-full h-full flex flex-col justify-start">
      <header className="mb-10">
        <h1 className="mb-2">Return to Olympus</h1>
        <h2>Combat Simulator</h2>
      </header>
      <div className="ml-auto mr-auto">
        <div className="grid grid-rows-6 grid-cols-6">
          {Array.from({ length: 36 }).map((_, index) => (
            <Grid key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
