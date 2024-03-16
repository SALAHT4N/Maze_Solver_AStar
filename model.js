/*
 *0 -> Empty
 *1 -> Wall
 *2 -> Start
 *3 -> test
 *4 -> Goal
 */
export const state = {
  width: 0,
  height: 0,
  heuristicFunction: "",
  speed: 1,
  maze: [],
  startNode: {
    x: 0,
    y: 0,
  },
  endNodes: [
    {
      x: 0,
      y: 0,
    },
  ],
};

export const solve = function (callback) {
  //Priority Queue ?
  //Closed List ?
  const intId = setInterval(() => {
    //
  }, 1000 - state.speed * 100);
};

const getHeuristic = function (startPos, endPos) {
  return heuristicFunctions[state.heuristicFunction]();
};

const heuristicFunctions = {
  manhattan: (startPos, endPos) =>
    Math.abs(startPos.y - endPos.y) + Math.abs(startPos.x - endPos.x),
  ecludian: (startPos, endPos) => 0,
};

export const setDimensions = function (dimensions) {
  state.height = dimensions.height ?? state.height;
  state.width = dimensions.width ?? state.width;
};
