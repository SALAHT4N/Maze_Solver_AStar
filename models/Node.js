import { state } from "./state.js";

export class Node {
  id;
  x = 0;
  y = 0;
  heuristics = [];
  fValue;
  cost = 0;
  parent;

  constructor(x, y, cost, parent) {
    this.x = x;
    this.y = y;
    this.id = `${this.x}_${this.y}`;
    this.heuristics = state.endNodes.map((endNode) =>
      getHeuristic({ x: this.x, y: this.y }, endNode)
    );
    this.parent = parent;
    this.cost = cost;
    this.fValue =
      this.heuristics.reduce(
        (acc, curr) => Math.min(acc, curr),
        this.heuristics[0]
      ) + this.cost;
  }
  isGoal() {
    return this.heuristics.some((v) => v == 0);
  }
}

const getHeuristic = function (startPos, endPos) {
  return heuristicFunctions[state.heuristicFunction](startPos, endPos);
};

const heuristicFunctions = {
  manhattan: (startPos, endPos) =>
    Math.abs(startPos.y - endPos.y) + Math.abs(startPos.x - endPos.x),

  ecludian: (startPos, endPos) =>
    Math.sqrt(
      Math.pow(endPos.x - startPos.x) + Math.pow(endPos.y - startPos.y)
    ),
};
