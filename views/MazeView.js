import { CellView } from "./CellView.js";
import * as colors from "../config.js";

export class MazeView {
  _element = document.querySelector("#maze-container");

  createMaze(width, height) {
    this._clear();
    this._element.className = "";
    this._element.classList.add("grid");
    this._element.classList.add("gap-3");
    this._element.classList.add(`grid-cols-${width}`);

    const countOfCells = width * height;
    console.log(countOfCells);
    for (let i = 0; i < countOfCells; i++) {
      this._addCell(new CellView(0, 0, colors.stateColors, colors.stateGlows));
    }
    console.log("maze created");
  }

  addHandlerChangeState(handler) {
    this._element.addEventListener("click", (e) => {
      const cell = e.target.closest(".card.body");

      if (!cell) return;

      handler();
    });
  }

  _clear() {
    this._element.innerHTML = "";
  }

  _addCell(cell) {
    this._element.insertAdjacentHTML("beforeend", cell.generateMarkup());
  }
}
