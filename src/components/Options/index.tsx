import React, { FC } from "react";
import "./index.css";

interface OptionsProps {
  onChange: (e: string) => void;
}

const Options: FC<OptionsProps> = (props) => {
  const { onChange } = props;
  return (
    <div className="option">
      <select name="cars" id="cars">
        <option className="option__item" value="volvo">
          BFS
        </option>
        <option className="option__item" value="saab">
          DFS
        </option>
        <option className="option__item" value="mercedes">
          AKT
        </option>
        <option className="option__item" value="audi">
          A Star
        </option>
      </select>
    </div>
  );
};

export default Options;
