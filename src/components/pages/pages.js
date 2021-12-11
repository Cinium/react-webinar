import React from "react";
import "./pages.css";

function Pages({ load, page }) {
  function changePage(e) {
    const page = Number(e.target.textContent);
    const offset = (page - 1) * 10;
    load(offset, page);
  }

  function getPaginationGroup() {
    let start;

    if (page === 1 || page === 2) {
      start = 0;
    } else if (page < 11 && page > 7) {
      start = Math.floor((page - 1) / 5) * 5;
    } else {
      start = page - 3;
    }

    return new Array(5).fill().map((_, idx) => start + idx + 1);
  }

  return (
    <div className="Pages">
      {page > 3 && (
        <>
          <span
            onClick={changePage}
            className={`Pages__link ${page === 1 ? "Pages__link_active" : ""}`}
          >
            1
          </span>
          {page > 4 && <span>...</span>}
        </>
      )}

      {getPaginationGroup().map((item, index) => (
        <span
          key={index}
          onClick={changePage}
          className={`Pages__link ${page === item ? "Pages__link_active" : ""}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default Pages;
