import _ from "lodash";
import { DataNode } from "./DataNode";
import { Edge, Node } from "reactflow";

export class DataEdges<T extends DataNode> {
  node: T;
  cost: number;

  constructor(node: T, cost: number) {
    this.node = node;
    this.cost = cost;
  }
}

export class CityNode extends DataNode {
  data: string;
  g?: number;
  nearsWithCost: DataEdges<CityNode>[];

  static target: string = "";
  static root: string = "";

  constructor(props: {
    data: string;
    nears: DataEdges<CityNode>[];
    status: "target" | "checked" | "wait" | "checking";
    g?: number;
    id?: string;
    parent?: DataNode;
  }) {
    const { data, g, nears = [], status = "wait", id, parent } = props;
    super({ nears: [], status, id, parent });
    this.data = data;
    this.g = g;
    this.nearsWithCost = nears;
  }

  getDataString(): string {
    return `${this.data}, g=${this.g}, f=${this.f()}`;
  }

  findNears(): CityNode[] {
    let nodes: CityNode[] = [];

    for (const edge of this.nearsWithCost) {
      let node = edge.node;
      let cost = edge.cost + (this.g ?? 0);
      if (cost < (node.g ?? Infinity)) {
        node.g = cost;
        node.parent = this;
        nodes.push(node);
      }
    }

    return nodes;
  }

  isDestination(): boolean {
    if (this.data == CityNode.target) {
      this.status = "target";
      return true;
    }
    return false;
  }

  f(): number {
    const heristic: { [key: string]: number } = {
      Arad: 366,
      Bucharest: 0,
      Craiova: 160,
      Diobreta: 242,
      Eforde: 161,
      Fagaras: 178,
      Churgiv: 77,
      Hirsova: 151,
      Tas: 226,
      Lugo: 244,
      Mehadia: 241,
      Neamt: 234,
      Oradea: 380,
      Pitesti: 98,
      Vilcea: 192,
      Sibiu: 250,
      Timisoara: 329,
      Urzicend: 80,
      Vash: 199,
      Zerind: 374,
    };
    return (this.g ?? 0) + heristic[this.data];
  }

  public getEdges(): Edge[] {
    let data = this.nearsWithCost.map((near): Edge => {
      console.log("f" + this.data, this.f());
      return {
        id:
          +this.id < +near.node.id
            ? `${this.id}=>${near.node.id}`
            : `${near.node.id}=>${this.id}`,
        source: this.id,
        target: near.node.id,
      };
    });
    return data;
  }

  public clone() {
    return new CityNode({
      data: this.data,
      nears: this.nearsWithCost,
      status: this.status,
      g: this.g,
      id: this.id,
      parent: this.parent,
    });
  }
}
