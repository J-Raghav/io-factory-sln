import React, { useState } from "react";

function CalculateMaximumProfit(n) {
  const profitPerTurn = {
    P: 1000,
    T: 1500,
    C: 3000
  };
  const timeToBuild = {
    P: 4,
    T: 5,
    C: 10
  };
  const specialCases = [5, 6, 10];
  
  if (n < 5) {
    return { T: 0, P: 0, C: 0, profit: 0 };
  }

  if (!!specialCases.find((i) => i === n)) {
    const pCount = Math.floor(n / 4);
    const profit =
      (timeToBuild.P * profitPerTurn.P * (pCount - 1) * pCount) / 2 + profitPerTurn.P * pCount * (n % timeToBuild.P);
    return { T: 0, P: pCount, C: 0, profit };
  } else {
    const pCount = n % timeToBuild.T === 0 ? 1 : 0;
    const tCount = Math.floor(n / timeToBuild.T) - pCount;
    const profit =
      (timeToBuild.T * profitPerTurn.T * (tCount - 1) * tCount) / 2 +
      profitPerTurn.T * tCount * ( pCount === 0 ? n % timeToBuild.T : timeToBuild.T) +
      pCount * profitPerTurn.P;
    return { T: tCount, P: pCount, C: 0, profit };
  }
}

function FormatAnswer(ans) {
  return Object.entries(ans)
    .filter(([k, v]) => k !== "profit")
    .reduce((pre, cur) => `${pre} ${cur[0]}:${cur[1]}`, "")
    .trimStart();
}

export default function MaximumProfitProblem() {
  const [input, setInput] = useState(0);
  const answer = input && CalculateMaximumProfit(input);

  return (
    <div className="w-100 h-100 p-5">
      <div style={{ height: "3rem" }}>
        <h2 className="h2">Maximum Profit Problem</h2>
        {!!answer ? (
          <div className="d-flex">
            <span>Ans. {FormatAnswer(answer)}</span>
            <span className="ms-auto">Profit: ${answer.profit}</span>
          </div>
        ) : null}
      </div>
      <div className="form-group mx-auto my-5">
        <label htmlFor={"time-limit"}>Time Limit</label>
        <input
          id="time-limit"
          className="form-control rounded-0"
          type="number"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
