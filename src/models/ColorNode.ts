import { Edge, Node } from "reactflow";

let index = 0;

export class ColorNode {
  id: string;
  data: any;
  nears: ColorNode[];
  color: string;

  static colors: string[] = [
    "FF6D60",
    "F4EEE0",
    "F3E99F",
    "98D8AA",
    "BFCCB5",
    "7C96AB",
    "B9EDDD",
    "87CBB9",
    "569DAA",
    "577D86",
  ];

  constructor(props: {
    id?: string;
    data?: any;
    nears?: ColorNode[];
    color?: string;
  }) {
    const { id = `${index++}`, data = "", nears = [], color = "" } = props;
    this.nears = nears;
    this.data = data;
    this.id = id;
    this.color = color;
  }

  public toString() {
    return this.data ?? this.id;
  }

  public getEdges(): Edge[] {
    return this.nears.map((near): Edge => {
      return {
        id:
          +this.id < +near.id
            ? `${this.id}=>${near.id}`
            : `${near.id}=>${this.id}`,
        source: this.id,
        target: near.id,
      };
    });
  }

  public getNode(): Node {
    return {
      id: this.id,
      data: {
        label: this.toString(),
      },
      position: { x: 0, y: 0 },
      style: {
        background: "#" + this.color,
      },
    };
  }
}
