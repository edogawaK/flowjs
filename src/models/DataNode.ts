import { Edge, Node } from "reactflow";
let index = 0;
export abstract class DataNode {
  public id: string;
  public parent?: DataNode;
  public nears: DataNode[];
  public status: "target" | "checked" | "wait" | "checking";

  constructor(props: {
    nears: DataNode[];
    status: "target" | "checked" | "wait" | "checking";
    id?: string;
    parent?: DataNode;
  }) {
    const { nears = [], status = "wait", id = "" + index++, parent } = props;
    this.id = id;
    this.nears = nears;
    this.status = status;
    this.parent = parent;
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

  public getRoad() {
    const road: DataNode[] = [];
    let node: DataNode | undefined = this;
    do {
      road.unshift(node);
      node = node.parent;
    } while (node);
    return road;
  }

  abstract getDataString(): string;
  abstract findNears(): DataNode[];
  abstract isDestination(): boolean;
  abstract f(): number;
}
