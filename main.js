import "./style.css";
import * as menu from "./views/MenuView.js";
import * as model from "./models/model.js";
import { MazeView } from "./views/MazeView.js";
import appConstants from "./appConstants.js";
import { state } from "./models/state.js";

const startAlgorithm = function () {
  const data = menu.getAllInputData();
  state.width = data.width;
  state.height = data.height;
  state.heuristicFunction = data.heuristicFunction;
  state.speed = data.speed;

  //check if there's no maze

  const cellViewsMatrix = maze.getMazeStateMatrix();
  cellViewsMatrix[0][0]._state = "start";
  cellViewsMatrix[1][0]._state = "block";
  cellViewsMatrix[1][1]._state = "block";
  cellViewsMatrix[3][3]._state = "goal";

  const stateMatrix = cellViewsMatrix.map((row) =>
    row.map((cell) => appConstants.blockTypes[cell._state])
  );
  console.log("State matrix (controller): ");
  console.log(stateMatrix);
  state.maze = stateMatrix;
  state.endNodes = [
    {
      x: 3,
      y: 3,
    },
  ];
  state.startNode = {
    x: 0,
    y: 0,
    cost: 0,
  };
  state.heuristicFunction = "manhattan";
  model.solve(() => {
    console.log(model.state.maze);
  });
};

const registerDimensions = function (dimensions) {
  model.setDimensions(dimensions);

  maze.createMaze(state.width, state.height);
};

const updateMaze = function (x, y) {
  // know the currently selected block type
  const currentBlockType = state.selectedBlockType;

  // update maze state
  state.maze[y][x] = appConstants.blockTypes[currentBlockType];

  // add the corresponding color
  maze.updateCellState(`${x}_${y}`, currentBlockType);
};

const init = function () {
  maze.addHandlerChangeState(updateMaze);
  menu.addHandlerStartButton(startAlgorithm);
  menu.addHandlerReadDimensions(registerDimensions);
};
let maze = new MazeView();
init();
