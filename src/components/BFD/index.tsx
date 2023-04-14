import React, { useCallback, useLayoutEffect, useState } from "react";
import _ from "lodash";
import { CityNode } from "../../models/CityNode";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { useA } from "../../hooks/useA";
import { useRenderGraph } from "../../hooks/useRenderGraph";
import { useBFD } from "../../hooks/useBFD";

const BFD = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [opens, setOpens] = useState<CityNode[]>([]);

  // useLayoutEffect(() => {
  //   let { images: data, openImages } = useA();
  //   let stateIndex = 0;
  //   let interval = setInterval(() => {
  //     if (stateIndex == data.length) {
  //       clearInterval(interval);
  //       return;
  //     }
  //     let { nodes, edges } = useRenderGraph(data[stateIndex]);
  //     setNodes(nodes);
  //     setEdges(edges);
  //     setOpens(openImages[stateIndex] ?? []);
  //     stateIndex++;
  //   }, 2000);
  // }, []);
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
  useLayoutEffect(() => {
    let data = useBFD({
      initBottle1: 4,
      initBottle2: 3,
    });
    let stateIndex = 0;
    let interval = setInterval(() => {
      if (stateIndex == data.length) {
        clearInterval(interval);
        return;
      }
      let { nodes, edges } = useRenderGraph(data[stateIndex++]);
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
};

export default BFD;
