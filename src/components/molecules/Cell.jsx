import React from 'react';

const Cell = ({ value, onClick, isSelected, isRelated, isEmpty, row, col }) => {
  let classes = "sudoku-cell";
  
  if (isSelected) {
    classes += " selected";
  } else if (isRelated) {
    classes += " related";
  }
  
  if (!isEmpty) {
    classes += " filled";
  }
  
  // Add thicker borders for 3x3 box separation
  if (row % 3 === 0) classes += " border-t-2";
  if (col % 3 === 0) classes += " border-l-2";
  if (row === 8) classes += " border-b-2";
  if (col === 8) classes += " border-r-2";

  return (
    <button
      className={classes}
      onClick={onClick}
    >
      {isEmpty ? '' : value}
    </button>
  );
};

export default Cell;