import { DataNode } from "../models/DataNode";

const AKT = (rootNode: DataNode, images: DataNode[][]) => {
  const openNodes: DataNode[] = [rootNode];
  while (true) {
    const node: DataNode | null = DataNode.getBestNode(openNodes);

    if (!node) return null;

    images.push([...openNodes]);

    if (node.isDestination()) return node;

    let newNodes = node.findNears();
    node.status = "checked";
    openNodes.push(...newNodes);
    images.push([...openNodes]);
  }
};

export const useAKT = (props: { rootNode: DataNode }) => {
  const { rootNode } = props;

  let images: DataNode[][] = [[rootNode]];

  const targetNode = AKT(rootNode, images);

  return images;
};
