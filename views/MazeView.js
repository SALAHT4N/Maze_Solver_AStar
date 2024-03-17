import { CellView } from "./CellView.js";
import * as colors from "../config.js";

export class MazeView {
  _element = document.querySelector("#maze-container");
  _matrix = [];

  _stateColors;
  _stateGlows;
  _width;
  createMaze(width, height, stateColors, stateGlows) {
    this._stateColors = stateColors;
    this._stateGlows = stateGlows;

    this._clear();
    this._element.className = "";
    this._element.classList.add("grid");
    this._element.classList.add("gap-3");
    this._element.classList.add(`grid-cols-${width}`);
    this._width = width;
    this._matrix = [];

    const countOfCells = width * height;
    let tempCellArray = [];
    console.log(countOfCells);
    for (let i = 0; i < countOfCells; i++) {
      const { x, y } = this._getDimensionsFromIndex(i);

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
      const cell = e.target.closest(".card.body");

      if (!cell) return;
      // know the coordintaes of this cell by counting how many cells are before it
      const cellIndex = getCellCoordinates(cell);

      handler(this._getDimensionsFromIndex(cellIndex));
    });

    const getCellCoordinates = (cell) =>
      Array.from(this._element.querySelectorAll(".card.body")).findIndex((el) =>
        el.isEqualNode(cell)
      );
  }

  updateCellState(id, state) {
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

  _getDimensionsFromIndex(index) {
    return {
      x: index % this._width,
      y: Math.floor(index / this._width),
    };
  }

  getMazeStateMatrix() {
    return this._matrix;
  }
}
