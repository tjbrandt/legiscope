import React from "react";

export default function PaginationButtons(props) {
  const { range, setPage, page, slice, increasePage, decreasePage } = props;

  React.useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      const firstpage = page - 1;
      setPage(firstpage);
    }
  }, [slice, page, setPage, range]);

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

  const pageGroups = createGroups(range);

  const selectionGroupsButtons = pageGroups.map((group) => {
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
        <button
          key={firstGroupPage}
          className="button-current-page__inactive"
          onClick={() => setPage(firstGroupPage)}
        >
          {buttonDisplay(group)}
        </button>
      );
    }
  });

  return (
    <div className="component--page-buttons">
      <button onClick={decreasePage} className="button-page-selection">
        {" "}
        <img src="images/left_arrow_icon.png" alt="left arrow"></img>
      </button>

      {selectionGroupsButtons}

      <button onClick={increasePage} className="button-page-selection">
        {" "}
        <img src="images/right_arrow_icon.png" alt="left arrow"></img>{" "}
      </button>
    </div>
  );
}
