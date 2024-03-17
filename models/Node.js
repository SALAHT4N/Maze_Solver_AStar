export class Node {
  id;
  x = 0;
  y = 0;
  heuristics = [];
  fValue;
  cost = 0;
  parent;
  constructor(x, y, cost, parent, endNodes) {
    this.x = x;
    this.y = y;
    this.id = `${this.x}_${this.y}`;
    this.heuristics = endNodes.map((endNode) =>
      getHeuristic({ x: this.x, y: this.y }, endNode)
    );
    this.parent = parent;
    this.fValue =
      this.heuristics.reduce((acc, curr) => Math.min(acc, curr)) + this.cost;
    this.cost = cost;
  }
  isGoal() {
    return this.heuristics.some((v) => v == 0);
  }
}
