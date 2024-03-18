export const state = {
  width: 0,
  height: 0,
  heuristicFunction: "manhattan",
  selectedBlockType: "",
  speed: 1,
  maze: [],
  startNode: null,
  endNodes: [],
  isPlaying: false,
};

export const setDimensions = function (dimensions) {
  state.height = dimensions.height ?? state.height;
  state.width = dimensions.width ?? state.width;
};

export const setMaze = function (maze) {
  state.maze = maze;
};

export const removeStartNode = function () {
  state.startNode = null;
};

export const removeEndNode = function (x, y) {
  state.endNodes = state.endNodes.filter(
    (endNode) => endNode.x === x && endNode.y === y
  );
};

export const changeCellState = function (x, y, blockType) {
  if (blockType === "start") {
    state.startNode = { x, y, cost: 0 };
  } else if (blockType === "goal") {
    if (state.endNodes.length == 2) {
      throw new Error("Maximum number of goals is 2");
    }

    state.endNodes.push({ x, y, cost: 1 });
  }
};
