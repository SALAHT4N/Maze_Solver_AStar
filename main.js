import "./style.css";
import getAllInputData from "./views/menuView.js";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

document.querySelector("#start-button").addEventListener("click", () => {
  console.log(getAllInputData());
});
