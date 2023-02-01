import React from "react";

export default function SearchField(props) {
  const searchValue = props.searchValue;

  return (
    <input
      type="text"
      name="searchTerm"
      value={searchValue}
      onChange={props.handleSearch}
      placeholder="Search"
    ></input>
  );
}
