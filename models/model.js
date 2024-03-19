import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import appConstants from "../appConstants.js";
import { clearEndNodes, state } from "./state.js";
import { Node } from "./Node.js";
import { hideResumePauseBtn } from "../views/MenuView.js";

export const solve = function (callback) {
  if (!state.startNode) {
    throw new Error("Specify start node");
  }
  if (state.endNodes.length > 2) {
    throw new Error("Maximum number of goals is 2");
  }
  if (state.endNodes.length == 0) {
    throw new Error("Please select a goal to start solving");
  }

  const expandChild = (childX, childY, parent) => {
    const child = new Node(childX, childY, parent.cost + 1, parent);

    const storedChildOpen = closedList.find((node) => node.id == child.id);
    const storedChildClosed = openList
      .toArray()
      .find((node) => node.id == child.id);

    const visited = storedChildClosed || storedChildOpen;
    const currentValueIsLower =
      child.fValue < storedChildClosed?.fValue ||
      child.fValue < storedChildOpen?.fValue;

    if (visited && currentValueIsLower) {
      if (storedChildOpen) {
        openList.remove((c) => c.id == storedChildOpen.id);
        openList.enqueue(child);
      } else {
        const nodeIndex = closedList.findIndex(
          (c) => c.id == storedChildClosed.id
        );

        closedList.splice(nodeIndex, 1);
        openList.enqueue(child);

        callback({ x: storedChildClosed.x, y: storedChildClosed.y }, "empty");
      }
    } else if (!(storedChildClosed || storedChildOpen)) {
      openList.enqueue(child);
    }
  };

  const openList = new MinPriorityQueue((n) => n.fValue);
  const closedList = [];

  openList.enqueue(
    new Node(state.startNode.x, state.startNode.y, 0, null, state.endNodes)
  );

  const intId = setInterval(() => {
    if (state.isPaused) return;

    const n = openList.dequeue();

    if (n === null) {
      clearEndNodes();
      hideResumePauseBtn();
      clearInterval(intId);
    }

    if (n.isGoal()) {
      clearEndNodes();
      hideResumePauseBtn();

      clearInterval(intId);
      state.maze[n.y][n.x] = appConstants.blockTypes["start"];

      let parent = n;

      const colorSolutionPath = () => {
        if (parent === null) {
          clearInterval(intSolutionPathId);
          state.isPlaying = false;
          return;
        }
        callback({ x: parent.x, y: parent.y }, "solution");

        parent = parent.parent;
      };

      const intSolutionPathId = setInterval(colorSolutionPath, 100);

      return;
    }

    const isNotBlock = (x, y) =>
      state.maze[y][x] != appConstants.blockTypes.block;

    const up = {
      x: n.x,
      y: n.y - 1,
      isValid() {
        return this.y >= 0 && isNotBlock(this.x, this.y);
      },
    };

    const right = {
      x: n.x + 1,
      y: n.y,
      isValid() {
        return this.x < state.width && isNotBlock(this.x, this.y);
      },
    };

    const left = {
      x: n.x - 1,
      y: n.y,
      isValid() {
        return this.x >= 0 && isNotBlock(this.x, this.y);
      },
    };

    const down = {
      x: n.x,
      y: n.y + 1,
      isValid() {
        return this.y < state.height && isNotBlock(this.x, this.y);
      },
    };

    // expand the 4 directions
    [up, left, right, down].forEach(
      (child) => child.isValid() && expandChild(child.x, child.y, n)
    );

    // Finish testing current node
    closedList.push(n);

    state.maze[n.y][n.x] = appConstants.blockTypes.test;

    callback({ x: n.x, y: n.y }, "test");
  }, 500 - state.speed * 115);

  state.gameLoopId = intId;
};
