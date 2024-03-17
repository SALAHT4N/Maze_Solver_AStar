import "./style.css";
import * as menu from "./views/MenuView.js";
import * as model from "./model.js";
import { MazeView } from "./views/MazeView.js";
import appConstants from "./appConstants.js";
let maze;

const startAlgorithm = function () {
  const data = menu.getAllInputData();
  model.state.width = data.width;
  model.state.height = data.height;
  model.state.heuristicFunction = data.heuristicFunction;
  model.state.speed = data.speed;

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
  model.state.maze = stateMatrix;
  model.state.endNodes = [
    {
      x: 3,
      y: 3,
    },
  ];
  model.state.startNode = {
    x: 0,
    y: 0,
    cost: 0,
  };
  model.state.heuristicFunction = "manhattan";
  model.solve(() => {
    console.log(model.state.maze);
  });
};

const registerDimensions = function (dimensions) {
  model.setDimensions(dimensions);
  maze = new MazeView();
  maze.createMaze(model.state.width, model.state.height);
};

const init = function () {
  menu.addHandlerStartButton(startAlgorithm);
  menu.addHandlerReadDimensions(registerDimensions);
};

init();
