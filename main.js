import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

const mazeContainer = document.querySelector("#maze-container");

const mazeCell = {
  x: 0,
  y: 0,
  state: "start" || "block" || "empty" || "goal" || "test",
};

const stateColors = {
  start: "bg-green-600",
  block: "bg-base-light",
  empty: "bg-base-100",
  goal: "bg-red-700",
  test: "bg-blue-600/50",
};

const stateGlows = {
  start: "shadow-green-600",
  goal: "shadow-red-600/50",
};

class CellView {
  #state;
  constructor() {
    this.state = "empty";
  }
}

class Cell {
  #state;
  constructor() {
    this.state = "";
  }
}
const cells = [
  new CellView(),
  { state: "empty" },
  { state: "test" },
  { state: "start" },
  { state: "empty" },
  { state: "empty" },
  { state: "goal" },
  { state: "empty" },
  { state: "empty" },
  { state: "empty" },
  { state: "empty" },
  { state: "empty" },
];

const width = `${Math.floor(Math.sqrt(cells.length))}`;

mazeContainer.classList.add(`grid-cols-${width}`);

for (let cell of cells) {
  mazeContainer.insertAdjacentHTML(
    "afterbegin",
    `
      <div
        class="card-body transition-all hover:-translate-y-1 duration-150 ${
          stateColors[cell.state]
        } ${stateGlows[cell.state] ?? ""} shadow-md rounded-md"
      ></div>
    `
  );
}
