import { DataNode } from "../models";
import { Bottle, Bottles } from "../models";

export const useBFD = () => {
  let bottles: Bottles = new Bottles(new Bottle(4), new Bottle(3), []);
  let states: Bottles[][] = [[bottles]];
  const BFD = (bottles: Bottles) => {
    const opens: Bottles[] = [bottles];

    while (opens.length != 0) {
      const currentState: Bottles = opens[0];
      if (currentState.isDestination()) break;
      // console.log("step-----------------------------");
      // console.log("focus", currentState.toString());
      let newStateFromBottle1 = currentState.generateFromBottle1();
      let newStateFromBottle2 = currentState.generateFromBottle2();
      opens.push(...newStateFromBottle1, ...newStateFromBottle2);
      states.push([
        ...states[states.length - 1],
        ...newStateFromBottle1,
        ...newStateFromBottle2,
      ]);
      // opens.forEach((state) => console.log(state.toString()));
      opens.shift();
    }
    return bottles;
  };
  const state = BFD(bottles);
  return states;
};
