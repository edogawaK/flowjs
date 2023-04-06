import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import { useRenderGraph } from "./hooks/useRenderGraph";
import { DataNode } from "./models";

let node1: DataNode = new DataNode(null, []);
let node2: DataNode = new DataNode(null, [node1]);
let node3: DataNode = new DataNode(null, []);
let node4: DataNode = new DataNode(null, []);
let node5: DataNode = new DataNode(null, [node3, node2]);

const init: DataNode[] = [node1, node2, node3, node4, node5];

/* -------------------------------------------------------------------------- */
/*                                      .                                     */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                      .                                     */
/* -------------------------------------------------------------------------- */
export default function App() {
  const { nodes: nodeList, edges: edgeList } = useRenderGraph(init);
  const [nodes, setNodes, onNodesChange] = useNodesState(nodeList);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgeList);
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
