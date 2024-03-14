import CellView from "./CellView.js";

export class MazeView {
  _element = document.querySelector("#maze-container");

  createMaze(width, height) {
    this._clear();
    this._element.classList.add(`grid-cols-${width}`);

    const countOfCells = width * height;

    for (let i = 0; i < countOfCells; i++) {
      this.addCell(new CellView());
    }
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

  addCell(cell) {
    this._element.insertAdjacentHTML("beforeend", cell._generateMarkup());
  }
}
