import appConstants from "../appConstants.js";
const widthInput = document.querySelector("#width-input");
const heightInput = document.querySelector("#height-input");
const heuristicFunctionsRadioButtons = [
  document.querySelector("#manhattan-radio-input"),
  document.querySelector("#ecludian-radio-input"),
];
const speedRangeInput = document.querySelector("#speed-range-input");
const startBtn = document.querySelector("#start-button");

export const getAllInputData = () => {
  return {
    width: getWidthInputValue(),
    height: getHeightInputValue(),
    heuristicFunction: getHeuristicInputValue(),
    speed: getSpeedRangeInputValue(),
  };
};

export const addHandlerStartButton = function (handler) {
  startBtn.addEventListener("click", () => {
    handler();
  });
};

export const addHandlerReadDimensions = function (handler) {
  widthInput.addEventListener("focusout", () => {
    const dimensions = {
      width: getWidthInputValue(),
    };

    handler(dimensions);
  });

  heightInput.addEventListener("focusout", () => {
    const dimensions = {
      height: getHeightInputValue(),
    };

    handler(dimensions);
  });
};

const getWidthInputValue = () => {
  let inputWidthValue = +widthInput.value || appConstants.defaultBoardWidth;

  if (inputWidthValue > appConstants.maxBoardWidth) {
    inputWidthValue = appConstants.maxBoardWidth;
  }
  if (inputWidthValue < appConstants.minBoardWidth) {
    inputWidthValue = appConstants.minBoardWidth;
  }
  widthInput.value = inputWidthValue;
  return inputWidthValue;
};

const getHeightInputValue = () => {
  let inputHeightValue = +heightInput.value || appConstants.defaultBoardHeight;

  if (inputHeightValue > appConstants.maxBoardHeight) {
    inputHeightValue = appConstants.maxBoardHeight;
  }
  if (inputHeightValue < appConstants.minBoardHeight) {
    inputHeightValue = appConstants.minBoardHeight;
  }
  heightInput.value = inputHeightValue;
  return inputHeightValue;
};

const getHeuristicInputValue = () => {
  return heuristicFunctionsRadioButtons
    .filter((h) => h.checked)
    .map((h) => h.id)[0]
    .split("-")[0];
};

const getSpeedRangeInputValue = () => {
  const speed = +speedRangeInput.value / 25;
  return speed;
};
