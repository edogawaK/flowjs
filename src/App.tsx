import React, { useCallback, useLayoutEffect } from "react";
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
import { Bottle, Bottles, DataNode } from "./models";
import { useBFD } from "./hooks/useBFD";
import BFD from "./components/BFD";

let node1: DataNode = new DataNode([]);
let node2: DataNode = new DataNode([node1]);
let node3: DataNode = new DataNode([]);
let node4: DataNode = new DataNode([]);
let node5: DataNode = new DataNode([node3, node2]);

const init: DataNode[] = [node1, node2, node3, node4, node5];

const { nodes: nodeList, edges: edgeList } = useRenderGraph(init);

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(nodeList);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgeList);
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges]
  );

  useLayoutEffect(() => {
    let data = useBFD();
    let stateIndex = 0;
    let interval = setInterval(() => {
      if (stateIndex == data.length) {
        clearInterval(interval);
        return;
      }
      let { nodes, edges } = useRenderGraph(data[stateIndex++]);
      console.log({ nodes, edges });
      setNodes(nodes);
      setEdges(edges);
    }, 1000);
  }, []);

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
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
