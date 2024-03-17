import {
  PriorityQueue,
  MinPriorityQueue,
  MaxPriorityQueue,
  ICompare,
  IGetCompareValue,
} from "@datastructures-js/priority-queue";
import appConstants from "../appConstants.js";
import state from "./state.js";
import { Node } from "./Node.js";

/*
 *0 -> Empty
 *1 -> Wall
 *2 -> Start
 *3 -> test
 *4 -> Goal
 */

export const solve = function (callback) {
  const openList = new MinPriorityQueue((n) => n.fValue);
  const closedList = [];
  openList.enqueue(
    new Node(state.startNode.x, state.startNode.y, 0, null, state.endNodes)
  );
  const expandChild = (childX, childY, parent) => {
    const rightChild = new Node(childX, childY, parent.cost + 1, parent);

    const storedRightChildOpen = closedList.find(
      (node) => node.id == rightChild.id
    );
    const storedRightChildClosed = openList
      .toArray()
      .find((node) => node.id == rightChild.id);

    if (
      (storedRightChildClosed || storedRightChildOpen) &&
      (rightChild.fValue < storedRightChildClosed?.fValue ||
        rightChild.fValue < storedRightChildOpen?.fValue)
    ) {
      if (storedRightChildOpen) {
        openList.remove((c) => c.id == storedRightChildOpen.id);
        openList.enqueue(rightChild);
      } else {
        const nodeIndex = closedList.findIndex(
          (c) => c.id == storedRightChildClosed.id
        );
        closedList.splice(nodeIndex, 1);
        openList.enqueue(rightChild);
      }
    } else {
      openList.enqueue(rightChild);
    }
  };
  console.log("----------------------------------------");
  console.log(state.maze);
  console.log("----------------------------------------");

  const intId = setInterval(() => {
    const n = openList.dequeue();

    if (n.isGoal()) {
      state.maze[n.y][n.x] = appConstants.blockTypes["start"];
      callback();
      clearInterval(intId);
      return;
    }
    const up = {
      x: n.x,
      y: n.y - 1,
    };
    const right = {
      x: n.x + 1,
      y: n.y,
    };
    const left = {
      x: n.x - 1,
      y: n.y,
    };
    const down = {
      x: n.x,
      y: n.y + 1,
    };

    if (up.y >= 0 && state.maze[up.y][up.x] != appConstants.blockTypes.block) {
      expandChild(up.x, up.y, n);
    }
    if (
      left.x >= 0 &&
      state.maze[left.y][left.x] != appConstants.blockTypes.block
    ) {
      expandChild(left.x, left.y, n);
    }
    console.log(state.maze[down.y][down.x] != appConstants.blockTypes.block);
    if (
      down.y < state.height &&
      state.maze[down.y][down.x] != appConstants.blockTypes.block
    ) {
      expandChild(n.x, n.y + 1, n);
    }
    if (
      right.x < state.width &&
      state.maze[right.y][right.x] != appConstants.blockTypes.block
    ) {
      expandChild(right.x, right.y, n);
    }
    console.log(openList);
    closedList.push(n);
    state.maze[n.y][n.x] = appConstants.blockTypes.test;
    callback();
  }, 10000);
};

const getHeuristic = function (startPos, endPos) {
  return heuristicFunctions[state.heuristicFunction](startPos, endPos);
};

const heuristicFunctions = {
  manhattan: (startPos, endPos) =>
    Math.abs(startPos.y - endPos.y) + Math.abs(startPos.x - endPos.x),
  ecludian: (startPos, endPos) => 0,
};

export const setDimensions = function (dimensions) {
  state.height = dimensions.height ?? state.height;
  state.width = dimensions.width ?? state.width;
};
