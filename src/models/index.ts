import { Edge, Node, XYPosition } from "reactflow";
import { v4 as uuid } from "uuid";
export interface Data {
  toString(): string;
}
export class DataNode {
  public id: string;
  public data: Data | null;
  public nears: DataNode[];
  public position: XYPosition = { x: 0, y: 0 };
  public type: "target" | "checked" | "wait";

  constructor(
    data: Data | null,
    nears: DataNode[],
    type: "target" | "checked" | "wait" = "target"
  ) {
    this.id = uuid();
    this.data = data;
    this.nears = nears;
    this.type = type;
  }

  public getNode(): Node {
    return {
      id: this.id,
      data: {
        label: this.data?.toString() || this.id,
      },
      position: this.position,
      style: {
        color: this.type === "target" ? "green" : "",
      },
    };
  }

  public getEdges(): Edge[] {
    return this.nears.map(
      (near): Edge => ({
        id: `${this.id}=>${near.id}`,
        source: this.id,
        target: near.id,
      })
    );
  }

  public addNear(child: DataNode) {
    this.nears.push(child);
  }

  public toJSON(): any {
    return {
      id: this.id,
      position: this.position,
      nears: this.nears.map((near) => near.toJSON()),
    };
  }
}

export class DataGraph {
  public nodes: DataNode[];
  public beginNodeId?: string;
  public endNodeId?: string;

  constructor(params: {
    nodes: DataNode[];
    beginNodeId: string;
    endNodeId?: string;
  }) {
    const { beginNodeId, nodes = [], endNodeId } = params;
    this.nodes = nodes;
  }
}
