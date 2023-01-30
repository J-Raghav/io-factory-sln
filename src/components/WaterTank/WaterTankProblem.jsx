import React, { useEffect, useMemo, useState } from "react";
import {
  containerHeight,
  containerHeightRem,
  containerWidthRem,
  getBlocks,
  getRandomBlockHeights,
  getWater,
  scaleX,
  scaleY,
} from "./utils";
import "./WaterTankProblem.css";

export default function WaterTankProblem({ colorPallet }) {
  const { main, cover } = colorPallet;
  const [blockHeights, setBlockHeights] = useState(getRandomBlockHeights());
  const [walls, setWalls] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [animations, setAnimations] = useState([]);
  const [hideLabel, setHideLabel] = useState(false);
  const waterBlocks = useMemo(
    () => getWater(blockHeights, colorPallet, walls),
    [blockHeights, colorPallet, walls]
  );
  const waterVolume = useMemo(
    () => waterBlocks.map((w) => w.overflow).reduce((pre, h) => pre + h, 0),
    [waterBlocks]
  );
  const containerStyles = {
    maxHeight: containerHeightRem + "rem",
    width: containerWidthRem + "rem",
    height: containerHeightRem + "rem",
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
  const reloadBlocks = (heights) => {
    animations.forEach((a) => a.cancel());
    setBlockHeights(heights ?? getRandomBlockHeights());
    setAnimations([]);
  };

  useEffect(() => {
    document.querySelectorAll('span[class="label"]').forEach((ele) => {
      ele.style.display = hideLabel ? "none" : "inline";
    });
  }, [hideLabel]);

  useEffect(() => {
    if (animations.length) {
      pourWater();
    }
  }, [walls]);

  return (
    <div
      className="h-100 v-100 d-flex align-items-center py-5"
      style={{ minWidth: "800px" }}
    >
      <div className="mx-auto" style={{ width: containerWidthRem + "rem" }}>
        <div className="w-100" style={{ height: "5rem" }}>
          <h2 className="h2">Water Tank Problem</h2>
          {animations.length !== 0 ? (
            <div className="ms-auto strong">
              <span style={{ color: main }}>Ans. {waterVolume} Units</span>
            </div>
          ) : null}
        </div>
        <div
          className={`water-tank d-flex align-items-end justify-content-center flex-wrap mx-auto`}
          style={{
            ...containerStyles,
            outline: walls ? `${main} solid 1px` : "",
          }}
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
            disabled={showEdit}
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
            onClick={() => setShowEdit(!showEdit)}
            disabled={animations.length}
          >
            {showEdit ? "Save" : "Edit"}
          </button>
          <button
            className="btn btn-secondary btn-sm rounded-0"
            onClick={() => setHideLabel(!hideLabel)}
          >
            {hideLabel ? "Show" : "Hide"} label
          </button>
          <button
            className="btn btn-secondary btn-sm rounded-0"
            onClick={() => setWalls(!walls)}
          >
            {walls ? "Closed" : "Open"} Container
          </button>
        </div>
        {showEdit ? (
          <div className="d-flex">
            {blockHeights.map((i, ix) => (
              <input
                type="number"
                key={ix}
                style={{ width: scaleX + "rem" }}
                value={i / scaleY || 0}
                onChange={(e) => {
                  let h = Number(e.target.value) * scaleY;
                  if (h >= 0 && h <= containerHeightRem) {
                    let newHeights = [...blockHeights];
                    newHeights[ix] = h;
                    reloadBlocks(newHeights);
                  }
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
