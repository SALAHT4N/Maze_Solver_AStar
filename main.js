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

  const stateMatrix = cellViewsMatrix.map((row) =>
    row.map((cell) => appConstants.blockTypes[cell._state])
  );

  console.log(stateMatrix);
  //get maze matrixized data
  model.state.maze = [];

  model.solve(() => maze.update());
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
