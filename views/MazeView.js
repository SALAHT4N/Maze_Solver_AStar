import { CellView } from "./CellView.js";
import * as colors from "../config.js";
import { formatId } from "./utilities.js";

export class MazeView {
  _element = document.querySelector("#maze-container");
  _matrix = [];

  _stateColors;
  _stateGlows;
  _width;

  constructor(stateColors, stateGlows) {
    this._stateColors = stateColors;
    this._stateGlows = stateGlows;
  }

  createMaze(width, height) {
    this._clear();
    this._element.className = "";
    this._element.classList.add("grid");
    this._element.classList.add("gap-3");
    this._element.classList.add(`grid-cols-${width}`);
    this._width = width;
    this._matrix = [];

    const countOfCells = width * height;
    let tempCellArray = [];

    const getDimensionsFromIndex = (index) => {
      return {
        x: index % width,
        y: Math.floor(index / width),
      };
    };

    for (let i = 0; i < countOfCells; i++) {
      const { x, y } = getDimensionsFromIndex(i);

      const cell = new CellView(x, y, colors.stateColors, colors.stateGlows);

      this._addCell(cell);
      tempCellArray.push(cell);

      if ((i + 1) % width == 0) {
        this._matrix.push(tempCellArray);
        tempCellArray = [];
      }
    }
    console.log(this._matrix);
  }

  addHandlerChangeState(handler) {
    this._element.addEventListener("click", (e) => {
      const cell = e.target.closest(".card-body");

      console.log("[before identifying cell] inside click handler");
      console.log(e.target);

      if (!cell) return;

      console.log("[after identifying cell] inside click handler");

      const coordinates = getCellCoordinates(cell);

      handler(coordinates);
    });

    const getCellCoordinates = (cell) => {
      const [_, x, y] = cell.id.split("_");
      return { x: Number(x), y: Number(y) };
    };
  }

  updateCellColor(coordinates, state) {
    const id = formatId(coordinates);
    const cell = this._element.querySelector(`#${id}`);

    cell.className = "";
    cell.classList.add("card-body");
    cell.classList.add("transition-all");
    cell.classList.add("hover:-translate-y-1");
    cell.classList.add("duration-150");
    cell.classList.add("shadow-md");
    cell.classList.add("rounded-md");

    cell.classList.add(this._stateColors[state]);
    cell.classList.add(this._stateGlows[state]);
  }

  _clear() {
    this._element.innerHTML = "";
  }

  _addCell(cell) {
    this._element.insertAdjacentHTML("beforeend", cell.generateMarkup());
  }

  getMazeStateMatrix() {
    return this._matrix;
  }
}
