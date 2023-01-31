import React from "react";

export default function PaginationButtons(props) {
  const { range, setPage, page, slice, increasePage, decreasePage } = props;

  React.useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      const firstpage = page - 1;
      setPage(firstpage);
    }
  }, [slice, page, setPage, range]);

  console.log("range", range);

  function createGroups(array) {
    const itemsPerGroup = 5;

    const selectionGroups = array.reduce((resultsArray, item, index) => {
      const groupIndex = Math.floor(index / itemsPerGroup);
      if (!resultsArray[groupIndex]) {
        resultsArray[groupIndex] = [];
      }
      resultsArray[groupIndex].push(item);

      return resultsArray;
    }, []);

    return selectionGroups;
  }

  const testGroups = createGroups(range);

  const selectionGroupsButtons = testGroups.map((group) => {
    if (group.includes(page)) {
      return group.map((el, pageNumber) => {
        return (
          <button
            key={pageNumber}
            className={` ${"button-current-page"}
          ${
            page === el
              ? "button-current-page__active"
              : "button-current-page__inactive"
          }`}
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        );
      });
    } else {
      const firstGroupPage = Math.min(...group);
      const lastGroupPage = Math.max(...group);
      function buttonDisplay(group) {
        if (group.length === 1) {
          return `${firstGroupPage}`;
        } else {
          return `${firstGroupPage} - ${lastGroupPage} `;
        }
      }

      return (
        <button key={firstGroupPage} onClick={() => setPage(firstGroupPage)}>
          {buttonDisplay(group)}
        </button>
      );
    }
  });

  console.log(selectionGroupsButtons);

  return (
    <div>
      <button onClick={decreasePage}>
        {" "}
        <span>{"\u2190"}</span>{" "}
      </button>
      {/* {range.map((el, pageNumber) => (
        <button
          key={pageNumber}
          className={` ${"button-current-page"}
          ${
            page === el
              ? "button-current-page__active"
              : "button-current-page__inactive"
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))} */}

      {selectionGroupsButtons}

      <button onClick={increasePage}>
        {" "}
        <span>{"\u2192"}</span>{" "}
      </button>
    </div>
  );
}

//TODO add button that acts as "...", similar to Sales Overview Page after page 5 but before page 64
