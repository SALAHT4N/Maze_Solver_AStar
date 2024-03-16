export class CellView {
  _state;
  x;
  y;

  _parentElement = document.querySelector("#maze-container");
  _stateGlows;
  _stateColors;

  constructor(x, y, stateColors, stateGlows) {
    this.state = "empty";
    this.x = x;
    this.y = y;

    this._stateColors = stateColors;
    this._stateGlows = stateGlows;
  }

  generateMarkup() {
    console.log("markup generated");
    return `
      <div class="card-body transition-all hover:-translate-y-1 duration-150 
      ${this._stateColors[this.state]} ${
      this._stateGlows[this.state] ?? ""
    } shadow-md rounded-md"></div> `;
  }

  setState(stateValue) {
    if (!(stateValue in ["start", "block", "empty", "goal", "test"])) {
      throw new Error();
    }

    this.state = stateValue;
  }
}
