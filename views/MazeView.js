import { CellView } from "./CellView.js";
import * as colors from "../config.js";

export class MazeView {
  _element = document.querySelector("#maze-container");
  _matrix = [];

  createMaze(width, height) {
    this._clear();
    this._element.className = "";
    this._element.classList.add("grid");
    this._element.classList.add("gap-3");
    this._element.classList.add(`grid-cols-${width}`);
    this._matrix = [];

    const countOfCells = width * height;
    let tempCellArray = [];
    console.log(countOfCells);
    for (let i = 0; i < countOfCells; i++) {
      const cell = new CellView(0, 0, colors.stateColors, colors.stateGlows);
      this._addCell(cell);
      tempCellArray.push(cell);

      if ((i + 1) % width == 0) {
        this._matrix.push(tempCellArray);
        tempCellArray = [];
      }
    }
    console.log(this._matrix);
    console.log("maze created");
  }

  addHandlerChangeState(handler) {
    this._element.addEventListener("click", (e) => {
      const cell = e.target.closest(".card.body");

      if (!cell) return;

      handler();
    });
  }

  update() {}

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
