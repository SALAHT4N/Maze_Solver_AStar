export const state = {
  width: 0,
  height: 0,
  heuristicFunction: "",
  selectedBlockType: "",
  speed: 1,
  maze: [],
  startNode: null,
  endNodes: [],
};

export const setDimensions = function (dimensions) {
  state.height = dimensions.height ?? state.height;
  state.width = dimensions.width ?? state.width;
};

export const setMaze = function (maze) {
  state.maze = maze;
};

export const changeCellState = function (x, y, state) {
  if (state === "start") {
    state.startNode = new Node(x, y, 0, null);
  } else if (state === "goal") {
    if (state.endNodes.length == 2) {
      throw new Error("Maximum number of goals is 2");
    }

    state.endNodes.push(new Node(x, y, 1, null));
  }
};
