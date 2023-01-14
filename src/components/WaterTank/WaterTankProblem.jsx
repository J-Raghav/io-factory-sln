import React, { useEffect, useMemo, useState } from "react";
import {
  containerHeightRem,
  containerWidthRem,
  getBlocks,
  getRandomBlockHeights,
  getWater,
} from "./utils";
import './WaterTankProblem.css'

export default function WaterTankProblem({ colorPallet }) {
  const { main, cover } = colorPallet;
  const [blockHeights, setBlockHeights] = useState(getRandomBlockHeights());
  const [animations, setAnimations] = useState([]);
  const [hideLabel, setHideLabel] = useState(false);
  const waterBlocks = useMemo(
    () => getWater(blockHeights, colorPallet),
    [blockHeights, colorPallet]
  );
  const waterVolume = useMemo(
    () => waterBlocks.map((w) => w.overflow).reduce((pre, h) => pre + h, 0),
    [waterBlocks]
  );
  const containerStyles = {
    maxHeight: containerHeightRem + "rem",
    width: containerWidthRem + "rem",
    height: containerHeightRem + "rem"
  };

  const pourWater = () => {
    setAnimations(
      waterBlocks.map((w, ix) => {
        const ele = document.getElementById(`water-${ix}`);
        const { keyFrames, animateOptions } = w;
        return ele.animate(keyFrames, animateOptions);
      })
    );
  };
  const reloadBlocks = () => {
    animations.forEach((a) => a.cancel());
    setBlockHeights(getRandomBlockHeights());
    setAnimations([]);
  };

  useEffect(() => {
    document.querySelectorAll('span[class="label"]').forEach((ele) => {
      ele.style.display = hideLabel ? "none" : "inline";
    });
  }, [hideLabel]);

  return (
    <div
      className="h-100 v-100 d-flex align-items-center">
      <div className="mx-auto" style={{ width: containerWidthRem + "rem" }}>
        <div className="w-100" style={{ height: "5rem" }}>
          <h2 className="h2">
            Water Tank Problem
          </h2>
          {animations.length !== 0 ? (
            <div className="ms-auto strong">
              <span style={{ color: main }}>Ans. {waterVolume} Units</span>
            </div>
          ) : null}
        </div>
        <div
          className={`water-tank d-flex align-items-end justify-content-center flex-wrap mx-auto`}
          style={containerStyles}
        >
          {waterBlocks.map((w) => w.element)}
          {getBlocks(blockHeights, { main, cover })}
        </div>
        <div
          className="d-flex mx-auto mt-1"
          style={{ width: containerStyles.width }}
        >
          <button
            className="btn btn-primary btn-sm rounded-0"
            onClick={() => pourWater()}
          >
            Pour Water
          </button>
          <button
            className="btn btn-secondary btn-sm rounded-0"
            onClick={() => reloadBlocks()}
          >
            Reload
          </button>
          <button
            className="btn btn-secondary ms-auto btn-sm rounded-0"
            onClick={() => setHideLabel(!hideLabel)}
          >
            {hideLabel ? "Show" : "Hide"} label
          </button>
        </div>
      </div>
    </div>
  );
}
