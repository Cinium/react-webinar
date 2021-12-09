import React, { useState } from "react";
import "./pages.css";

function Pages({ load }) {
  const [currentPage, setCurrentPage] = useState(1);

  function changePage(e) {
    const page = Number(e.target.textContent);
    setCurrentPage(page);

    load((page - 1) * 10);
  }

  function getPaginationGroup() {
    let start;

    if (currentPage === 1 || currentPage === 2) {
      start = 0;
    } else if (currentPage < 11 && currentPage > 7) {
      start = Math.floor((currentPage - 1) / 5) * 5;
    } else {
      start = currentPage - 3;
    }

    return new Array(5).fill().map((_, idx) => start + idx + 1);
  }

  return (
    <div className="Pages">
      {currentPage > 3 && (
        <>
          <span
            onClick={changePage}
            className={`Pages__link ${currentPage === 1 ? "Pages__link_active" : ""}`}
          >
            1
          </span>
          {currentPage > 4 && <span>...</span>}
        </>
      )}

      {getPaginationGroup().map((item, index) => (
        <span
          key={index}
          onClick={changePage}
          className={`Pages__link ${currentPage === item ? "Pages__link_active" : ""}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default Pages;
