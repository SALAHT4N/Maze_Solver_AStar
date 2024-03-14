import "./style.css";
import getAllInputData from "./views/menuView.js";

document.querySelector("#start-button").addEventListener("click", () => {
  console.log(getAllInputData());
});
