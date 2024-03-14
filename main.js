import "./style.css";
import { stateColors, stateGlows } from "./config.js";
import * as model from "./model.js";

const mazeContainer = document.querySelector("#maze-container");

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
