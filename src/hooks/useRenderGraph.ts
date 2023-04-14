import dagre from "dagre";
import { Edge, Node } from "reactflow";
import { DataNode } from "../models/DataNode";

import _ from "lodash";

export interface CanDrawGraph {
  getNode: () => Node;
  getEdges: () => Edge[];
}

export const useRenderGraph = (dataNodes: CanDrawGraph[]) => {
  const nodes = dataNodes.map((node) => node.getNode());
  let edges = dataNodes.reduce((edges: Edge[], node: CanDrawGraph) => {
    edges.push(...node.getEdges());
    return edges;
  }, []);
  edges = _.uniqBy(edges, "id");

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 172;
  const nodeHeight = 36;

  const getLayoutedElements = (nodes: any[], edges: any[]) => {
    dagreGraph.setGraph({ rankdir: "TB" });

    nodes.forEach((node: any) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge: any) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node: any) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = "top";
      node.sourcePosition = "bottom";

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges };
  };

  return getLayoutedElements(nodes, edges);
};
