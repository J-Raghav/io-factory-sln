import React, { useState } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { CalculateMaximumProfit } from "./utils";

export default function MaximumProfitProblem() {
  const [input, setInput] = useState(0);
  const memo = useRef({});
  const [maxTableRows, setMaxTableRows] = useState(100);
  const allPossiblitiesSorted = useMemo(
    () => CalculateMaximumProfit(input, memo.current),
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
          <div className="d-flex justify-content-between align-items-center">
            <small className="">
              {`Showing ${Math.min(
                allPossiblitiesSorted.length,
                maxTableRows
              )} of ${allPossiblitiesSorted.length} possible build sequence.`}
            </small>
            <div className="my-3 w-25">
              <input
                type="number"
                className="form-control w-100"
                value={maxTableRows}
                min={10}
                max={10000}
                placeholder="Maximum table rows."
                title="Maximum table rows."
                onChange={(e) =>
                  setMaxTableRows(Math.max(10, Number(e.target.value)))
                }
              />
            </div>
          </div>
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
              {allPossiblitiesSorted
                .slice(0, maxTableRows)
                .map((possibleAnswer, ix) => (
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
