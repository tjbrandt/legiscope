import React from "react";

export default function GraphsButton(props) {
  function handleclick() {
    const updateGraphs = props.changeGraphs;
    updateGraphs(props.id);
  }

  return (
    <button className="button-show-stats" onClick={handleclick}>
      See stats
    </button>
  );
}
