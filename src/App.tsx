import React, { useCallback, useLayoutEffect, useState } from "react";
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
import { Bottle, DataNode } from "./models";
import { useBFD } from "./hooks/useBFD";
import BFD from "./components/BFD";
import { useAKT } from "./hooks/useAKT";
import { HaNoiTower, HaNoiTowerNode } from "./models/HaNoiTower";
import Options from "./components/Options";
import { useA } from "./hooks/useA";
import { CityNode } from "./models/CityNode";
import _ from "lodash";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [opens, setOpens] = useState<CityNode[]>([]);
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges]
  );

  useLayoutEffect(() => {
    let { images: data, openImages } = useA();

    let stateIndex = 0;
    let interval = setInterval(() => {
      if (stateIndex == data.length) {
        clearInterval(interval);
        return;
      }
      let { nodes, edges } = useRenderGraph(data[stateIndex]);
      setNodes(nodes);
      setEdges(edges);
      setOpens(openImages[stateIndex] ?? []);
      stateIndex++;
    }, 2000);
  }, []);

  // useLayoutEffect(() => {
  //   let data = useAKT({
  //     rootNode: new HaNoiTowerNode({
  //       data: new HaNoiTower({
  //         columnA: [1],
  //         columnB: [2],
  //         columnC: [3],
  //         count: 3,
  //       }),
  //       g: 0,
  //       nears: [],
  //       status: "wait",
  //     }),
  //   });

  //   let stateIndex = 0;
  //   let interval = setInterval(() => {
  //     if (stateIndex == data.length) {
  //       clearInterval(interval);
  //       return;
  //     }
  //     let { nodes, edges } = useRenderGraph(data[stateIndex++]);
  //     setNodes(nodes);
  //     setEdges(edges);
  //   }, 1000);
  // }, []);

  // useLayoutEffect(() => {
  //   let data = useBFD({
  //     initBottle1: 4,
  //     initBottle2: 3,
  //   });

  //   let stateIndex = 0;
  //   let interval = setInterval(() => {
  //     if (stateIndex == data.length) {
  //       clearInterval(interval);
  //       return;
  //     }
  //     let { nodes, edges } = useRenderGraph(data[stateIndex++]);
  //     setNodes(nodes);
  //     setEdges(edges);
  //   }, 1000);
  // }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* <Options /> */}
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
      <div
        style={{
          width: "100vw",
          height: "200px",
          position: "absolute",
          bottom: 0,
        }}
      >
        {_.orderBy(opens, (i) => i.f()).map((i) => (
          <div>{i.getDataString()}</div>
        ))}
      </div>
    </div>
  );
}
