import _ from "lodash";
import { DataNode } from "./DataNode";

export class HaNoiTowerNode extends DataNode {
  data: HaNoiTower;
  g: number;

  constructor(props: {
    data: HaNoiTower;
    nears: DataNode[];
    status: "target" | "checked" | "wait";
    g: number;
  }) {
    const { data, g, nears = [], status = "wait" } = props;
    super({ nears, status });
    this.data = data;
    this.g = g;
  }

  getDataString(): string {
    return `
    A: ${this.data.columnA.join("..")}||
    B: ${this.data.columnB.join("..")}||
    C: ${this.data.columnC.join("..")}||
    `;
  }

  findNears(): DataNode[] {
    let nodes: DataNode[] = [];

    let possibleStates = [
      ["A", "B"],
      ["A", "C"],
      ["B", "A"],
      ["B", "C"],
      ["C", "B"],
      ["C", "A"],
    ];

    possibleStates.forEach((state) => {
      let cloneData = this.data.clone();
      if (
        cloneData.move(
          cloneData.getColumn(state[0]),
          cloneData.getColumn(state[1])
        )
      ) {
        nodes.push(
          new HaNoiTowerNode({
            data: cloneData,
            g: this.g + 1,
            nears: [],
            status: "wait",
          })
        );
      }
    });

    this.nears = [...nodes];

    return nodes;
  }

  isDestination(): boolean {
    if (this.data.columnC.length == this.data.count) {
      this.status = "target";
      return true;
    }
    this.status = "checked";
    return false;
  }

  f(): number {
    const heristic = [[1, 2, 3], [1, 2], [1], [1, 3], [], [3], [2], [2, 3]];
    let h = 0;

    for (let target of heristic) {
      if (_.isEqual(this.data.columnC, target)) {
        break;
      }
      h++;
    }

    return h + this.g;
  }
}

export class HaNoiTower {
  columnA: number[] = [];
  columnB: number[] = [];
  columnC: number[] = [];
  count: number;

  constructor(props: {
    columnA: number[];
    columnB: number[];
    columnC: number[];
    count?: number;
  }) {
    const {
      columnA,
      columnB,
      columnC,
      count = columnA.length + columnB.length + columnC.length,
    } = props;
    this.columnA = columnA;
    this.columnB = columnB;
    this.columnC = columnC;
    this.count = count;
  }

  clone() {
    return new HaNoiTower({
      columnA: [...this.columnA],
      columnB: [...this.columnB],
      columnC: [...this.columnC],
    });
  }

  move(columnA: number[], columnB: number[]): boolean {
    const itemA = columnA[columnA.length - 1] || 0;
    const itemB = columnB[columnB.length - 1] || 0;

    if (!itemA || itemA <= itemB) return false;

    columnB.push(itemA);
    columnA.pop();
    return true;
  }

  getColumn(name: string) {
    if (name == "A") return this.columnA;
    if (name == "B") return this.columnB;
    if (name == "C") return this.columnC;
    return [];
  }
}
