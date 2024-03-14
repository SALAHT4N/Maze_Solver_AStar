import "./style.css";
import * as menu from "./views/MenuView.js";
import * as model from "./model.js";
import { MazeView } from "./views/MazeView.js";

const startAlgorithm = function () {
  model.solve(() => maze.update());
};

const registerDimensions = function (dimensions) {
  model.setDimensions(dimensions);
  const maze = new MazeView();
  maze.createMaze(model.state.width, model.state.height);
};

const init = function () {
  menu.addHandlerStartButton(startAlgorithm);
  menu.addHandlerReadDimensions(registerDimensions);
};

init();
