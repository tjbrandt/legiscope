import React from "react";

export default function CurrentListButton(props) {
  function handleClick() {
    const changeCL = props.changeCurentList;
    changeCL();
  }
  //TODO returning div and text at the moment to test functionality; eventually I want this to look like a sliding toggle button
  return (
    <div onClick={handleClick} className="button__current-list">
      <span>Click Me to switch between senate and house</span>
    </div>
  );
}
