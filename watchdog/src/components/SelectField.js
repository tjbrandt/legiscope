import React from "react";
import { statesList } from "../modules/unitedStates";

export default function SelectField(props) {
  return (
    <select id="selectedState" onChange={props.handleFilter}>
      {statesList.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
}
