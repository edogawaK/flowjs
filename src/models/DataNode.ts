import { Edge, Node } from "reactflow";
import { v4 } from "uuid";

export abstract class DataNode {
  public id: string;
  public nears: DataNode[];
  public status: "target" | "checked" | "wait" | "checking";

  constructor(props: {
    nears: DataNode[];
    status: "target" | "checked" | "wait" | "checking";
  }) {
    const { nears = [], status = "wait" } = props;
    this.id = v4();
    this.nears = nears;
    this.status = status;
  }

  public getNode(): Node {
    return {
      id: this.id,
      data: {
        label: this.getDataString(),
      },
      position: { x: 0, y: 0 },
      style: {
        color:
          this.status === "target"
            ? "green"
            : this.status === "checked"
            ? "red"
            : this.status === "checking"
            ? "blue"
            : "pink",
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

  public static getBestNode = (nodes: DataNode[]): DataNode | null => {
    let bestNode = null;
    let bestNodeValue = Infinity;

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].f() < bestNodeValue && nodes[i].status == "wait") {
        bestNode = nodes[i];
        bestNodeValue = nodes[i].f();
      }
    }

    if (bestNode) {
      bestNode.status = "checking";
    }

    return bestNode;
  };

  abstract getDataString(): string;
  abstract findNears(): DataNode[];
  abstract isDestination(): boolean;
  abstract f(): number;
}
