import { CityNode, DataEdges } from "../models/CityNode";
import { DataNode } from "../models/DataNode";
import _ from "lodash";
const A = (rootNode: CityNode, graph: CityNode[]) => {
  let openNodes: CityNode[] = [rootNode];
  const images: CityNode[][] = [graph.map((i) => i.clone())];
  const openImages: CityNode[][] = [openNodes.map((i) => i.clone())];
  let targetNode: DataNode | null = null;

  while (true) {
    const node: DataNode | null = CityNode.getBestNode(openNodes);

    if (!node) break;

    if (node.isDestination()) {
      images.push(graph.map((i) => i.clone()));
      targetNode = node;
      break;
    }

    let newNodes = node.findNears() as CityNode[];
    node.status = "checked";
    openNodes.push(...newNodes);
    openNodes = _.uniqBy(openNodes, "id");
    openImages.push(
      openNodes.filter((i) => i.status == "wait").map((i) => i.clone())
    );
    images.push(graph.map((i) => i.clone()));
  }

  return {
    targetNode,
    images,
    openImages,
  };
};

export const useA = () => {
  let Zerind = new CityNode({
    data: "Zerind",
    nears: [],
    status: "wait",
  });
  let Sibiu = new CityNode({
    data: "Sibiu",
    nears: [],
    status: "wait",
  });
  let Oradea = new CityNode({
    data: "Oradea",
    nears: [],
    status: "wait",
  });
  let Timisoara = new CityNode({
    data: "Timisoara",
    nears: [],
    status: "wait",
  });
  let Arad = new CityNode({
    data: "Arad",
    nears: [],
    status: "wait",
    g: 0,
  });
  let Bucharest = new CityNode({
    data: "Bucharest",
    nears: [],
    status: "wait",
  });
  let Craiova = new CityNode({
    data: "Craiova",
    nears: [],
    status: "wait",
  });
  let Diobreta = new CityNode({
    data: "Diobreta",
    nears: [],
    status: "wait",
  });
  let Eforde = new CityNode({
    data: "Eforde",
    nears: [],
    status: "wait",
  });
  let Fagaras = new CityNode({
    data: "Fagaras",
    nears: [],
    status: "wait",
  });
  let Churgiv = new CityNode({
    data: "Churgiv",
    nears: [],
    status: "wait",
  });
  let Hirsova = new CityNode({
    data: "Hirsova",
    nears: [],
    status: "wait",
  });
  let Tas = new CityNode({
    data: "Tas",
    nears: [],
    status: "wait",
  });
  let Lugo = new CityNode({
    data: "Lugo",
    nears: [],
    status: "wait",
  });
  let Mehadia = new CityNode({
    data: "Mehadia",
    nears: [],
    status: "wait",
  });
  let Neamt = new CityNode({
    data: "Neamt",
    nears: [],
    status: "wait",
  });

  let Pitesti = new CityNode({
    data: "Pitesti",
    nears: [],
    status: "wait",
  });
  let Vilcea = new CityNode({
    data: "Vilcea",
    nears: [],
    status: "wait",
  });

  let Urzicend = new CityNode({
    data: "Urzicend",
    nears: [],
    status: "wait",
  });
  let Vash = new CityNode({
    data: "Vash",
    nears: [],
    status: "wait",
  });

  Arad.nearsWithCost = [
    new DataEdges(Zerind, 75),
    new DataEdges(Sibiu, 140),
    new DataEdges(Timisoara, 118),
  ];
  Oradea.nearsWithCost = [new DataEdges(Zerind, 71), new DataEdges(Sibiu, 151)];
  Zerind.nearsWithCost = [new DataEdges(Arad, 75), new DataEdges(Oradea, 71)];
  Sibiu.nearsWithCost = [
    new DataEdges(Arad, 140),
    new DataEdges(Oradea, 151),
    new DataEdges(Fagaras, 99),
    new DataEdges(Vilcea, 80),
  ];
  Timisoara.nearsWithCost = [
    new DataEdges(Arad, 118),
    new DataEdges(Lugo, 111),
  ];
  Lugo.nearsWithCost = [
    new DataEdges(Timisoara, 111),
    new DataEdges(Mehadia, 70),
  ];
  Mehadia.nearsWithCost = [
    new DataEdges(Lugo, 70),
    new DataEdges(Diobreta, 75),
  ];
  Diobreta.nearsWithCost = [
    new DataEdges(Mehadia, 75),
    new DataEdges(Craiova, 120),
  ];
  Vilcea.nearsWithCost = [
    new DataEdges(Craiova, 148),
    new DataEdges(Pitesti, 97),
    new DataEdges(Sibiu, 80),
  ];
  Craiova.nearsWithCost = [
    new DataEdges(Vilcea, 148),
    new DataEdges(Pitesti, 138),
    new DataEdges(Diobreta, 120),
  ];
  Pitesti.nearsWithCost = [
    new DataEdges(Vilcea, 97),
    new DataEdges(Craiova, 138),
    new DataEdges(Bucharest, 101),
  ];
  Fagaras.nearsWithCost = [
    new DataEdges(Sibiu, 99),
    new DataEdges(Bucharest, 211),
  ];
  Bucharest.nearsWithCost = [
    new DataEdges(Fagaras, 211),
    new DataEdges(Pitesti, 101),
  ];

  let rootNode = Arad;
  let targetNode = Bucharest;

  CityNode.root = rootNode.data;
  CityNode.target = targetNode.data;

  let graph: CityNode[] = [
    Arad,
    Bucharest,
    Craiova,
    Diobreta,
    Eforde,
    Fagaras,
    Churgiv,
    Hirsova,
    Tas,
    Lugo,
    Mehadia,
    Neamt,
    Oradea,
    Pitesti,
    Vilcea,
    Sibiu,
    Timisoara,
    Urzicend,
    Vash,
    Zerind,
  ];

  const { images, targetNode: target, openImages } = A(rootNode, graph);

  return {
    images,
    openImages,
  };
};
