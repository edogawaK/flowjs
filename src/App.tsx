import _ from "lodash";

import BFD from "./components/BFD";
import Options from "./components/Options";
import WelshPowellView from "./components/WelshPowellView";
import DSView from "./components/DSView";
import { AView } from "./components/AView";
import "reactflow/dist/style.css";
import { useState } from "react";
import { AKTView } from "./components/AKTView";

export default function App() {
  const [option, setOption] = useState<string>("ds");
  return (
    <div>
      <Options onChange={(e) => setOption(e.target.value)} value={option} />
      {option == "ds" && <DSView />}
      {option == "welsh-powell" && <WelshPowellView />}
      {option == "akt" && <AKTView />}
      {option == "a-star" && <AView />}
      {option == "bfs" && <BFD />}
    </div>
  );
}
