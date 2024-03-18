import "./style.css";
import * as menu from "./views/MenuView.js";
import * as model from "./models/model.js";
import { MazeView } from "./views/MazeView.js";
import appConstants from "./appConstants.js";
import {
  state,
  setDimensions,
  setMaze,
  changeCellState,
} from "./models/state.js";
import { stateColors, stateGlows } from "./config.js";

const constructModelMaze = function (cellMatrixView) {
  return cellMatrixView.map((row) =>
    row.map((cell) => appConstants.blockTypes[cell._state])
  );
};

const startAlgorithm = function () {
  const data = menu.getAllInputData();
  state.width = data.width;
  state.height = data.height;
  state.heuristicFunction = data.heuristicFunction;
  state.speed = data.speed;

  const cellViewsMatrix = mazeView.getMazeStateMatrix();

  const stateMatrix = constructModelMaze(cellViewsMatrix);

  setMaze(stateMatrix);

  model.solve(() => {
    console.log(state.maze);
  });
};

const registerDimensions = function (dimensions) {
  setDimensions(dimensions);

  mazeView.createMaze(state.width, state.height);
};

const changeCellState = function ({ x, y }) {
  try {
    const currentBlockType = state.selectedBlockType;

    changeCellState(x, y, currentBlockType);

    mazeView.updateCellColor({ x, y }, currentBlockType);
  } catch (error) {
    alert(error.message);
  }
};

const init = function () {
  mazeView.addHandlerChangeState(changeCellState);
  menu.addHandlerStartButton(startAlgorithm);
  menu.addHandlerReadDimensions(registerDimensions);
};

let mazeView = new MazeView(stateColors, stateGlows);
init();
