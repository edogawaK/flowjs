export class Graph {
  nodes: number[][];
  static colors: string[] = [];

  constructor(nodes: number[][]) {
    this.nodes = nodes;
  }

  public toNode(props: { label: string; style: any }) {
    const { label, style } = props;
  }
}
