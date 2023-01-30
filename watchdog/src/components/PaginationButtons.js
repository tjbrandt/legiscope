import React from "react";

export default function PaginationButtons(props) {
  const { range, setPage, page, slice, increasePage, decreasePage } = props;

  React.useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <div>
      <button onClick={decreasePage}>
        {" "}
        <span>{"\u2190"}</span>{" "}
      </button>
      {range.map((page, pageNumber) => (
        <button
          key={pageNumber}
          //TODO set a className and css based on if the button is currently active
          onClick={() => setPage(page)}
        >
          {page}
        </button>
      ))}
      <button onClick={increasePage}>
        {" "}
        <span>{"\u2192"}</span>{" "}
      </button>
    </div>
  );
}

//TODO add button that acts as "...", similar to Sales Overview Page after page 5 but before page 64
