import _ from "lodash";
import { ColorNode } from "../models/ColorNode";

export class DS {
  graph: ColorNode[];
  colorIndex: number = 0;
  onDraw?: (e?: any) => void;
  usedColors: string[] = [];

  constructor(props: { graph: ColorNode[]; onDraw?: (e?: any) => void }) {
    const { graph, onDraw } = props;
    this.graph = [
      ...graph.sort((a, b) => {
        return a.nears.length < b.nears.length ? 1 : -1;
      }),
    ];
    this.onDraw = onDraw;
  }

  saturation(node: ColorNode) {
    return node.nears.reduce((coloredCount, currentNode) => {
      if (!!currentNode.color) {
        coloredCount++;
      }
      return coloredCount;
    }, 0);
  }

  colorSaturation(node: ColorNode) {
    let count = 0;

    const colors = node.nears.reduce(
      (colorList: { [key: string]: number }, currentNode) => {
        if (!colorList[currentNode.color]) {
          colorList[currentNode.color] = 1;
        } else {
          colorList[currentNode.color]++;
        }
        return colorList;
      },
      {}
    );
    colors[""] = 0;

    for (const color in colors) {
      count += colors[color];
    }

    return count;
  }

  draw() {
    if (this.isDone()) return;

    const bestNode = this.findBestNode();

    if (!bestNode) return;

    this.fillColor(bestNode);

    if (this.onDraw) {
      this.onDraw();
    }
  }

  isDone() {
    return !this.graph.length;
  }

  getColors() {
    return this.colorIndex + 1;
  }

  findBestNode(): ColorNode | undefined {
    let graphWithColor: { node: ColorNode; saturation: number }[] = [];

    let graphWithSaturation = this.graph.reduce(
      (
        nodes: { node: ColorNode; saturation: number }[],
        currentNode: ColorNode
      ) => {
        nodes.push({
          node: currentNode,
          saturation: this.colorSaturation(currentNode),
        });
        return nodes;
      },
      []
    );

    let orderedGraph = graphWithSaturation.sort((a, b) => {
      if (a.saturation < b.saturation) return 1;
      return -1;
    });

    graphWithColor.push(orderedGraph[0]);

    for (let i = 1; i < orderedGraph.length; i++) {
      if (orderedGraph[i].saturation == orderedGraph[i - 1].saturation)
        graphWithColor.push(orderedGraph[i]);
    }

    graphWithColor.sort((a, b) => {
      if (this.colorSaturation(a.node) < this.colorSaturation(b.node)) return 1;
      return -1;
    });

    let bestNodeIndex = this.graph.findIndex(
      (node) => node.id == graphWithColor[0].node.id
    );

    this.graph.splice(bestNodeIndex, 1);
    return graphWithColor[0].node;
  }

  fillColor(node: ColorNode) {
    let usedColors = this.usedColors.reduce(
      (colors: { [color: string]: boolean }, currentColor) => {
        colors[currentColor] = true;
        return colors;
      },
      {}
    );

    console.log("used colors", usedColors);

    for (const near of node.nears) {
      usedColors[near.color] = false;
    }

    for (const color in usedColors) {
      if (usedColors[color]) {
        node.color = color;
        return;
      }
    }
    this.colorIndex++;
    node.color = ColorNode.colors[this.colorIndex];
    this.usedColors.push(ColorNode.colors[this.colorIndex]);
  }
}
