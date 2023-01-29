import React, { useState } from "react";
import { useMemo } from "react";

const profitPerTurn = {
  P: 1000,
  T: 1500,
  C: 3000,
};
const timeToBuild = {
  P: 4,
  T: 5,
  C: 10,
};

function CalculateMaximumProfit(input) {
  if (!input) {
    return [];
  }

  let allPossiblities = FindAllPossibleBuildOrders(input).map((i) =>
    FindProfit(i)
  );
  return [...allPossiblities.sort((a, b) => b.profit - a.profit)];
}

export default function MaximumProfitProblem() {
  const [input, setInput] = useState(0);
  const allPossiblitiesSorted = useMemo(
    () => CalculateMaximumProfit(input),
    [input]
  );
  const maxProfit = allPossiblitiesSorted[0];
  const columnOrder = ["order", "answer", "P", "T", "C", "profit"];

  return (
    <div className="w-100 h-100 p-5">
      <div style={{ height: "3rem" }}>
        <h2 className="h2">Maximum Profit Problem</h2>
        {!!maxProfit ? (
          <div className="d-flex">
            <span>Ans. {maxProfit.answer}</span>
            <span className="ms-auto">Profit: ${maxProfit.profit}</span>
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
      {allPossiblitiesSorted.length ? (
        <div className="">
          <small className="">
            Showing {allPossiblitiesSorted.length} possible build sequence.
          </small>
          <table className="table bg-light shadow-lg">
            <thead>
              <tr>
                {columnOrder.map((i, ix) => (
                  <th scope="col" key={ix}>
                    {i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPossiblitiesSorted.map((possibleAnswer, ix) => (
                <tr
                  className={`${
                    possibleAnswer.profit === maxProfit.profit
                      ? "table-active"
                      : ""
                  }`}
                  key={ix}
                >
                  {columnOrder.map((cn, ix) => (
                    <td key={ix}>{possibleAnswer[cn]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

function FindProfit({ order, remainder }) {
  let profit = 0;
  let profitIncPerTurn = 0;

  for (let i = 0; i < order.length; i++) {
    let ch = order[i];
    profit += profitIncPerTurn * timeToBuild[ch];
    profitIncPerTurn += profitPerTurn[ch];
  }

  profit += profitIncPerTurn * remainder;
  let grouped = order.split("").reduce(
    (pre, cur) => {
      pre[cur] = (pre[cur] || 0) + 1;
      return pre;
    },
    { P: 0, T: 0, C: 0 }
  );
  return {
    order,
    remainder,
    profit,
    answer: FormatAnswer(grouped),
    ...grouped,
  };
}

function FindAllPossibleBuildOrders(t, props) {
  let tout = [];
  props = props || {
    order: "",
    remainder: 0,
  };

  if (t > timeToBuild.P) {
    let nextProps = { ...props, order: props.order + "P" };
    tout = [
      ...tout,
      ...FindAllPossibleBuildOrders(t - timeToBuild.P, nextProps),
    ];
  }

  if (t > timeToBuild.T) {
    let nextProps = { ...props, order: props.order + "T" };
    tout = [
      ...tout,
      ...FindAllPossibleBuildOrders(t - timeToBuild.T, nextProps),
    ];
  }

  if (t > timeToBuild.C) {
    let nextProps = { ...props, order: props.order + "C" };
    tout = [
      ...tout,
      ...FindAllPossibleBuildOrders(t - timeToBuild.C, nextProps),
    ];
  }

  if (!tout.length) {
    let lastProps = {
      ...props,
      remainder: t,
    };
    return [lastProps];
  }

  return tout;
}

function FormatAnswer(grouped) {
  return Object.entries(grouped)
    .filter(([k, v]) => k !== "profit")
    .reduce((pre, cur) => `${pre} ${cur[0]}:${cur[1]}`, "")
    .trimStart();
}
