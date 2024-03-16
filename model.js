export const state = {
  width: 0,
  height: 0,
  maze: [[0, 1, 1, 1, 1, 0, 2]],
};

export const solve = function (callback) {
  console.log("Solving maze...");
  for (let i = 0; i < 5; i++) {
    callback();
  }
};

export const setDimensions = function (dimensions) {
  state.height = dimensions.height ?? state.height;
  state.width = dimensions.width ?? state.width;
};
