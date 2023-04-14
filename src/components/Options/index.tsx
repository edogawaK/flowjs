import React, { FC } from "react";
import "./index.css";

interface OptionsProps {
  onChange: (e: any) => void;
  value: string;
}

const Options: FC<OptionsProps> = (props) => {
  const { onChange, value } = props;
  return (
    <div className="option">
      <select name="options" id="options" onChange={onChange} value={value}>
        <option className="option__item" value="bfs">
          BFS
        </option>
        <option className="option__item" value="akt">
          AKT
        </option>
        <option className="option__item" value="a-star">
          A Star
        </option>
        <option className="option__item" value="welsh-powell">
          Welsh Powell
        </option>
        <option className="option__item" value="ds">
          DS
        </option>
      </select>
    </div>
  );
};

export default Options;
