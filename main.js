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
  removeStartNode,
  removeEndNode,
  clearEndNodes,
} from "./models/state.js";
import { stateColors, stateGlows } from "./config.js";

const constructModelMaze = function (cellMatrixView) {
  return cellMatrixView.map((row) =>
    row.map((cell) => appConstants.blockTypes[cell._state])
  );
};

const startAlgorithm = function () {
  try {
    state.isPlaying = true;
    menu.toggleBottomMenuButtons();
    const data = menu.getAllInputData();
    state.width = data.width;
    state.height = data.height;
    state.heuristicFunction = data.heuristicFunction;
    state.speed = data.speed;
    const cellViewsMatrix = mazeView.getMazeStateMatrix();

    const stateMatrix = constructModelMaze(cellViewsMatrix);

    setMaze(stateMatrix);

    model.solve(updateCell);
  } catch (e) {
    menu.toggleBottomMenuButtons();
    state.isPlaying = false;
    alert(e.message);
  }
};

const registerDimensions = function (dimensions) {
  setDimensions(dimensions);

  mazeView.createMaze(state.width, state.height);
};

const updateCell = function ({ x, y }, type) {
  try {
    const selectedBlockType = type ?? state.selectedBlockType;
    const currentCellType = mazeView.getCellType(x, y);

    if (!type && selectedBlockType === currentCellType) {
      // toggle
      mazeView.updateCellColor({ x, y }, "empty");

      // if start then remove startNode from staste
      selectedBlockType === "start" && removeStartNode();

      // if goal then pop from endNodes from state
      selectedBlockType === "goal" && removeEndNode(x, y);
    } else {
      if (selectedBlockType === "start") {
        console.log("selectedBlockType: ", selectedBlockType);
        mazeView.clearCellsOfType(selectedBlockType);
      }

      changeCellState(x, y, selectedBlockType);

      mazeView.updateCellColor({ x, y }, selectedBlockType);
    }
  } catch (error) {
    alert(error.message);
  }
};

const blockClicked = function (blockType) {
  state.selectedBlockType = blockType;
};

const resumePauseClicked = function () {
  state.isPaused = !state.isPaused;
  menu.setResumePauseBtnName(state.isPaused ? "Resume" : "Pause");
};

const clearButtonClicked = function () {
  state.isPaused = false;
  state.isPlaying = false;
  clearInterval(state.gameLoopId);
  clearEndNodes();
  mazeView.clearMaze();
};

const init = function () {
  mazeView.addHandlerChangeState(updateCell);
  menu.addHandlerStartButton(startAlgorithm);
  menu.addHandlerReadDimensions(registerDimensions);
  menu.addOnClickHandlerBlocks(blockClicked);
  menu.addOnClickResumePauseBtn(resumePauseClicked);
  menu.addOnClickClearBtn(clearButtonClicked);
};

let mazeView = new MazeView(stateColors, stateGlows);
mazeView._element.addEventListener(
  "click",
  (e) => {
    if (state.isPlaying) {
      e.stopPropagation();
    }
  },
  true
);
init();
