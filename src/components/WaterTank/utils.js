export const containerHeight = 8;
export const containerWidth = 10;
export const scaleX = 3;
export const scaleY = 2;
export const containerWidthRem = containerWidth * scaleX;
export const containerHeightRem = containerHeight * scaleY;


export const colorPallets = [
  { main: "#5F4B8B", cover: "#E69A8D" },
  { main: "#F95700", cover: "#00A4CC" },
  { main: "#000000", cover: "#ffffff" },
  { main: "#ADEFD1", cover: "#00203F" },
  { main: "#606060", cover: "#D6ED17" },
  { main: "#2C5F2D", cover: "#97BC62" },
  { main: "#00539C", cover: "#EEA47F" },
  { main: "#101820", cover: "#FEE715" },
];

export const DefaultColorPallet = { main: "#ADEFD1", cover: "#00203F" };

export function getRandomNumber(n) {
  return Math.floor(Math.random() * n);
}

export function getRandomBlockHeights() {
  return [...Array(containerWidth)].map(
    (_) => getRandomNumber(containerHeight) * scaleY
  );
}

export function getRandomColorPallet() {
  return colorPallets[getRandomNumber(colorPallets.length)];
}

// For finding out expected height of each water column.
export function getOverflowHeights(blockHeights) {
  let lmax = 0,
    rmax = 0;
  let lmaxs = blockHeights.map((bh, ix) => {
    lmax = Math.max(lmax, blockHeights[ix]);
    if (ix === 0) {
      return 0;
    }
    return lmax;
  });
  let rmaxs = blockHeights.map((bh, ix) => {
    rmax = Math.max(rmax, blockHeights[containerWidth - 1 - ix]);
    if (ix === containerWidth - 1) {
      return 0;
    }
    return rmax;
  });

  return lmaxs.map((i, ix) => Math.min(i, rmaxs[containerWidth - ix - 1]));
}

// Used for Rendering blocks.
export function getBlocks(blockHeights, { main, cover }) {
  return blockHeights.map((blockHeight, ix) => {
    const blockStyle = {
      height: blockHeight + "rem",
      width: scaleX + "rem",
      backgroundColor: main,
      border: `1px solid ${cover}`,
      zIndex: 2,
      color: cover,
    };

    return (
      <div className="block ps-2" key={`block-${ix}`} style={blockStyle}>
        {<span className="label">{blockHeight / scaleY}</span>}
      </div>
    );
  });
}

// Used for setting up water blocks and animation.
export function getWater(blockHeights, { cover, main }) {
  const overflowHeights = getOverflowHeights(blockHeights);

  return blockHeights.map((blockHeight, ix) => {
    const waterStyle = {
      height: "0rem",
      width: scaleX + "rem",
      position: "absolute",
      left: ix * scaleX + "rem",
      color: "#fff",
    };
    const overflowHeight = overflowHeights[ix];

    const keyFrames = [
      { height: `0rem` },
      { height: `${containerHeightRem}rem` },
      { height: overflowHeight + "rem" },
    ];
    const animateOptions = {
      fill: "forwards",
      duration: 1000 + ix * 75,
      iteration: 1,
    };

    return {
      element: (
        <div
          className="water ps-2 bg-primary"
          key={`water-${ix}`}
          id={`water-${ix}`}
          style={waterStyle}
        >
          <span className="label">
            {Math.max(overflowHeight - blockHeight, 0) / scaleY}
          </span>
        </div>
      ),
      keyFrames,
      animateOptions,
      overflow: Math.max(overflowHeight - blockHeight, 0) / scaleY,
    };
  });
}
