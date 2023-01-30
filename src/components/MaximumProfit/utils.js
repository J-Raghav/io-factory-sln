export const profitPerTurn = {
  P: 1000,
  T: 1500,
  C: 6000,
};
export const timeToBuild = {
  P: 4,
  T: 5,
  C: 10,
};

export function FindProfit({ order, remainder }) {
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

export function FindAllPossibleBuildOrdersWithMemo(t, memo = {}) {
  let tout = [];
  const memoLimit = 75;

  if (t < memoLimit && t in memo) {
    console.log("Using memo for", t);
    return memo[t];
  }

  console.log("Memo not found for", t);
  if (t > timeToBuild.P) {
    tout = [
      ...tout,
      ...FindAllPossibleBuildOrdersWithMemo(t - timeToBuild.P, memo).map(
        (i) => {
          return { ...i, order: "P" + i.order };
        }
      ),
    ];
  }

  if (t > timeToBuild.T) {
    tout = [
      ...tout,
      ...FindAllPossibleBuildOrdersWithMemo(t - timeToBuild.T, memo).map(
        (i) => {
          return { ...i, order: "T" + i.order };
        }
      ),
    ];
  }

  if (t > timeToBuild.C) {
    tout = [
      ...tout,
      ...FindAllPossibleBuildOrdersWithMemo(t - timeToBuild.C, memo).map(
        (i) => {
          return { ...i, order: "C" + i.order };
        }
      ),
    ];
  }

  if (!tout.length) {
    memo[t] = [{ remainder: t, order: "" }];
    return memo[t];
  }

  if (t < memoLimit) {
    memo[t] = tout;
  }

  return tout;
}

export function CalculateMaximumProfit(input, memo) {
  if (!input) {
    return [];
  }

  let allPossiblities = FindAllPossibleBuildOrdersWithMemo(input, memo).map(
    (i) => FindProfit(i)
  );
  return [...allPossiblities.sort((a, b) => b.profit - a.profit)];
}

export function FormatAnswer(grouped) {
  return Object.entries(grouped)
    .filter(([k, v]) => k !== "profit")
    .reduce((pre, cur) => `${pre} ${cur[0]}:${cur[1]}`, "")
    .trimStart();
}

export function FindAllPossibleBuildOrders(t) {
  let tout = [];

  if (t > timeToBuild.P) {
    tout = [
      ...tout,
      ...FindAllPossibleBuildOrders(t - timeToBuild.P).map((i) => {
        return { ...i, order: "P" + i.order };
      }),
    ];
  }

  if (t > timeToBuild.T) {
    tout = [
      ...tout,
      ...FindAllPossibleBuildOrders(t - timeToBuild.T).map((i) => {
        return { ...i, order: "T" + i.order };
      }),
    ];
  }

  if (t > timeToBuild.C) {
    tout = [
      ...tout,
      ...FindAllPossibleBuildOrders(t - timeToBuild.C).map((i) => {
        return { ...i, order: "C" + i.order };
      }),
    ];
  }

  if (!tout.length) {
    let lastProps = {
      order: "",
      remainder: t,
    };
    return [lastProps];
  }

  return tout;
}
