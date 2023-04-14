import React, { useEffect, useMemo, useState } from "react";
import { ColorNode } from "../../models/ColorNode";
import { useRenderGraph } from "../../hooks/useRenderGraph";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { WelshPowell } from "../../hooks/useWelshPowell";

let nodeA = new ColorNode({ data: "A" });
let nodeB = new ColorNode({ data: "B" });
let nodeC = new ColorNode({ data: "C" });
let nodeD = new ColorNode({ data: "D" });
let nodeE = new ColorNode({ data: "E" });
let nodeF = new ColorNode({ data: "F" });
let nodeG = new ColorNode({ data: "G" });
let nodeH = new ColorNode({ data: "H" });
let nodeI = new ColorNode({ data: "I" });
let nodeJ = new ColorNode({ data: "J" });
let nodeK = new ColorNode({ data: "K" });

nodeA.nears = [nodeB, nodeK];
nodeB.nears = [nodeA, nodeC, nodeH, nodeG, nodeF];
nodeC.nears = [nodeB, nodeD, nodeF];
nodeD.nears = [nodeC, nodeE];
nodeE.nears = [nodeD, nodeF];
nodeF.nears = [nodeC, nodeE, nodeG, nodeI, nodeB];
nodeG.nears = [nodeB, nodeF, nodeH];
nodeH.nears = [nodeB, nodeG, nodeI];
nodeI.nears = [nodeH, nodeF, nodeJ, nodeK];
nodeJ.nears = [nodeI];
nodeK.nears = [nodeA, nodeI];

const graph: ColorNode[] = [
  nodeA,
  nodeB,
  nodeC,
  nodeD,
  nodeE,
  nodeF,
  nodeG,
  nodeH,
  nodeI,
  nodeJ,
  nodeK,
];

const WelshPowellView = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const welshPowell = new WelshPowell({
      graph: [...graph],
      onDraw: () => {
        const { edges, nodes } = useRenderGraph(graph);
        setEdges(edges);
        setNodes(nodes);
      },
    });

    const interval = setInterval(() => {
      console.log("is done", welshPowell.isDone());
      if (welshPowell.isDone()) {
        console.log("colors", welshPowell.getColors());
        clearInterval(interval);
      }
      welshPowell.draw();
    }, 1000);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default WelshPowellView;
