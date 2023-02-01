import React from "react";

export default function CurrentListButton(props) {
  function handleClick() {
    const changeCL = props.changeCurentList;
    const resetSearch = props.resetSearch;
    changeCL();
    resetSearch();
  }
  //TODO returning div and text at the moment to test functionality; eventually I want this to look like a sliding toggle button
  return (
    <div onClick={handleClick} className="app--filter-switch">
      <span className={`app--filter-switch-${props.currentListName}`}>
        {props.currentListName}
      </span>
    </div>
  );
}
