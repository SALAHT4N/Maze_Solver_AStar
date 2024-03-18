import { formatId } from "./utilities.js";

export class CellView {
  _state;
  x;
  y;

  _stateGlows;
  _stateColors;

  constructor(x, y, stateColors, stateGlows) {
    this._state = "empty";
    this.x = x;
    this.y = y;

    this._stateColors = stateColors;
    this._stateGlows = stateGlows;
  }

  generateMarkup() {
    const id = formatId({
      x: this.x,
      y: this.y,
    });

    return `
      <div id="${id}"class="card-body transition-all hover:-translate-y-1 duration-150 
      ${this._stateColors[this._state]} ${
      this._stateGlows[this._state] ?? ""
    } shadow-md rounded-md"></div> `;
  }

  setState(stateValue) {
    // if (!(stateValue in ["start", "block", "empty", "goal", "test"])) {
    //   throw new Error();
    // }

    this._state = stateValue;
  }

  renderState() {}
}
