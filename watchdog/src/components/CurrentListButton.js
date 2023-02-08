import React from "react";

export default function CurrentListButton(props) {
  const [disabledButton, setDisabledButton] = React.useState("senate");
  const [enabledButton, setEnabledButton] = React.useState("house");

  function handleClick() {
    const changeCL = props.changeCurentList;
    const resetSearch = props.resetSearch;
    changeCL();
    resetSearch();

    setDisabledButton((prevButton) =>
      prevButton === "senate" ? "house" : "senate"
    );
    setEnabledButton((prevButton) =>
      prevButton === "house" ? "senate" : "house"
    );
  }

  React.useEffect(() => {
    const buttonToDisable = document.getElementById(`${disabledButton}`);
    const buttonToEnable = document.getElementById(`${enabledButton}`);
    buttonToDisable.setAttribute("disabled", "");
    buttonToEnable.removeAttribute("disabled", "");
  }, [disabledButton, enabledButton]);

  //TODO returning div and text at the moment to test functionality; eventually I want this to look like a sliding toggle button
  return (
    <div onClick={handleClick} className="app--filter-switch">
      <button
        id="senate"
        className={` ${"app--filter-switch-senate"}
          ${
            props.currentListName === "senate"
              ? "app--filter-switch__active"
              : "app--filter-switch__inactive"
          }`}
      >
        Senate
      </button>
      <button
        id="house"
        className={` ${"app--filter-switch-house"}
          ${
            props.currentListName === "house"
              ? "app--filter-switch__active"
              : "app--filter-switch__inactive"
          }`}
      >
        House
      </button>
    </div>
  );
}
