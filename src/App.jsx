import React from "react";
import { Chart } from "./components/LineChart";

function App() {
  return (
    <div
      style={{
        width: "1152px",
        margin: "0 auto",
        boxShadow: " -1px -2px 46px -6px rgba(0,0,0,0.65)",
      }}
    >
      <Chart></Chart>
    </div>
  );
}

export default App;
