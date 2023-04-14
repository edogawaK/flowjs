import { Bottle } from "../models";

export const useBFD = (props: { initBottle1: number; initBottle2: number }) => {
  const { initBottle1, initBottle2 } = props;

  let rootNode: Bottles = new Bottles(
    new Bottle(initBottle1),
    new Bottle(initBottle2),
    []
  );

  let nodes: Bottles[][] = [[rootNode]];

  const BFD = (bottles: Bottles) => {
    const opens: Bottles[] = [bottles];

    while (opens.length != 0) {
      const node: Bottles = opens[0];
      if (node.isDestination()) return node;
      let newNodes = node.findNears();
      opens.push(...newNodes);
      nodes.push([...nodes[nodes.length - 1], ...newNodes]);
      // opens.forEach((state) => console.log(state.toString()));
      opens.shift();
    }
  };

  const targetNode = BFD(rootNode);
  return nodes;
};
