import _ from "lodash";
import { ColorNode } from "../models/ColorNode";

export class WelshPowell {
  graph: ColorNode[];
  colorIndex: number = -1;
  onDraw?: (e?: any) => void;

  constructor(props: { graph: ColorNode[]; onDraw?: (e?: any) => void }) {
    const { graph, onDraw } = props;
    this.graph = [
      ...graph.sort((a, b) => {
        return a.nears.length < b.nears.length ? 1 : -1;
      }),
    ];
    console.log("order", graph);
    this.onDraw = onDraw;
  }

  draw() {
    if (this.isDone()) return;
    this.colorIndex++;
    const bestNodes = [this.graph.shift()!];
    let rejectNodes: { [key: string]: boolean } =
      this.getRejectNodes(bestNodes);

    for (let i = 0; i < this.graph.length; i++) {
      const nodeId = this.graph[i].id;
      if (!rejectNodes[nodeId]) {
        bestNodes.push(...this.graph.splice(i, 1));
        rejectNodes = this.getRejectNodes(bestNodes);
      }
    }

    for (const node of bestNodes) {
      node.color = ColorNode.colors[this.colorIndex];
    }

    if (this.onDraw) {
      this.onDraw();
    }
  }

  getRejectNodes(nodes: ColorNode[]) {
    const rejectNodes: { [key: string]: boolean } = {};

    for (const node of nodes) {
      rejectNodes[node.id] = true;
      for (const near of node.nears) {
        rejectNodes[near.id] = true;
      }
    }

    return rejectNodes;
  }

  isDone() {
    return !this.graph.length;
  }

  getColors() {
    return this.colorIndex + 1;
  }
}
