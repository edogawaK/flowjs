import { Edge, Node, XYPosition } from "reactflow";
import { v4 as uuid } from "uuid";
export interface Data {
  toString(): string;
}
let id = 0;
export class DataNode {
  public id: string;
  public nears: DataNode[];
  public position: XYPosition = { x: 0, y: 0 };
  public type: "target" | "checked" | "wait";

  constructor(nears: DataNode[], type: "target" | "checked" | "wait" = "wait") {
    this.id = "" + id++;
    this.nears = nears;
    this.type = type;
  }

  public toString() {
    return this.id;
  }

  public getNode(): Node {
    return {
      id: this.id,
      data: {
        label: this.toString(),
      },
      position: this.position,
      style: {
        color:
          this.type === "target"
            ? "green"
            : this.type === "checked"
            ? "red"
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

// export class DataGraph {
//   public nodes: DataNode<>[];
//   public beginNodeId?: string;
//   public endNodeId?: string;

//   constructor(params: {
//     nodes: DataNode[];
//     beginNodeId: string;
//     endNodeId?: string;
//   }) {
//     const { beginNodeId, nodes = [], endNodeId } = params;
//     this.nodes = nodes;
//   }
// }

export class Bottle {
  public capacity;
  public current;

  constructor(capacity: number, current: number = 0) {
    this.capacity = capacity;
    this.current = current;
  }
  public fill(size?: number) {
    size = size ?? this.capacity;
    if (this.capacity - this.current < size) {
      size = this.capacity - this.current;
    }
    this.current += size;
  }
  public pourOut(size?: number) {
    size = size ?? this.current;
    let pourOutSize = size > this.current ? this.current : size;
    this.current -= pourOutSize;
    return pourOutSize;
  }
  public isFull() {
    return this.capacity == this.current;
  }
  public isEmpty() {
    return 0 == this.current;
  }
  public clone() {
    return new Bottle(this.capacity, this.current);
  }
  public emptySize() {
    return this.capacity - this.current;
  }
}

export class Bottles extends DataNode {
  public bottle1: Bottle;
  public bottle2: Bottle;

  constructor(bottle1: Bottle, bottle2: Bottle, nears: Bottles[]) {
    super(nears);
    this.bottle1 = bottle1;
    this.bottle2 = bottle2;
  }

  // public toString(): string {
  //   return `Bottle1: ${this.bottle1.current}/${this.bottle1.capacity}||Bottle2: ${this.bottle2.current}/${this.bottle2.capacity}`;
  // }

  public generateFromBottle1(): Bottles[] {
    let temp1: Bottle, temp2: Bottle;
    let newOpenState: Bottles[] = [];
    //->A
    if (this.bottle1.isEmpty()) {
      temp1 = this.bottle1.clone();
      temp1.fill();
      let state = new Bottles(temp1, this.bottle2, []);
      newOpenState.push(state);
      this.addNear(state);
    }

    //A->
    // if (this.bottle1.isFull()) {
    //   if (this.bottle2.isFull()) {
    //     temp1 = this.bottle1.clone();
    //     temp1.pourOut();
    //     let state = new Bottles(temp1, this.bottle2, []);
    //     newOpenState.push(state);
    //     this.addNear(state);
    //   } else {
    //     temp1 = this.bottle1.clone();
    //     temp2 = this.bottle2.clone();
    //     temp2.fill(temp1.pourOut(temp2.emptySize()));
    //     let state = new Bottles(temp1, temp2, []);
    //     newOpenState.push(state);
    //     this.addNear(state);
    //   }
    // }
    if (!this.bottle1.isEmpty()) {
      temp1 = this.bottle1.clone();
      temp1.pourOut();
      let state = new Bottles(temp1, this.bottle2, []);
      newOpenState.push(state);
      this.addNear(state);

      if (!this.bottle2.isFull()) {
        temp1 = this.bottle1.clone();
        temp2 = this.bottle2.clone();
        temp2.fill(temp1.pourOut(temp2.emptySize()));
        let state = new Bottles(temp1, temp2, []);
        newOpenState.push(state);
        this.addNear(state);
      }
    }
    return newOpenState;
  }

  public generateFromBottle2(): Bottles[] {
    let temp1: Bottle, temp2: Bottle;
    let newOpenState: Bottles[] = [];
    //->A
    if (this.bottle2.isEmpty()) {
      temp2 = this.bottle2.clone();
      temp2.fill();
      let state = new Bottles(this.bottle1, temp2, []);
      newOpenState.push(state);
      this.addNear(state);
    }

    //A->
    // if (this.bottle2.isFull()) {
    //   if (this.bottle1.isFull()) {
    //     temp2 = this.bottle2.clone();
    //     temp2.pourOut();
    //     let state = new Bottles(this.bottle1, temp2, []);
    //     newOpenState.push(state);
    //     this.addNear(state);
    //   } else {
    //     temp1 = this.bottle1.clone();
    //     temp2 = this.bottle2.clone();
    //     temp1.fill(temp2.pourOut(temp1.emptySize()));
    //     let state = new Bottles(temp1, temp2, []);
    //     newOpenState.push(state);
    //     this.addNear(state);
    //   }
    // }
    if (!this.bottle2.isEmpty()) {
      temp2 = this.bottle2.clone();
      temp2.pourOut();
      let state = new Bottles(this.bottle1, temp2, []);
      newOpenState.push(state);
      this.addNear(state);

      if (!this.bottle1.isFull()) {
        temp1 = this.bottle1.clone();
        temp2 = this.bottle2.clone();
        temp1.fill(temp2.pourOut(temp1.emptySize()));
        let state = new Bottles(temp1, temp2, []);
        newOpenState.push(state);
        this.addNear(state);
      }
    }
    return newOpenState;
  }

  public isDestination() {
    if (this.bottle1.current == 2 || this.bottle2.current == 2) {
      this.type = "target";
      return true;
    }
    this.type = "checked";
    return false;
  }

  public toString() {
    return `Bottle1: ${this.bottle1.current}/${this.bottle1.capacity}||Bottle2: ${this.bottle2.current}/${this.bottle2.capacity}`;
  }
}
