import React from "react";

export default function GraphsButton(props) {
  return <button onClick={props.changeGraphs(props.id)}>Show Graphs</button>;
}
