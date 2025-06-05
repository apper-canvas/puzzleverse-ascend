import React from 'react';
import Cell from '../molecules/Cell';

const GameGrid = ({ sudokuData, selectedCell, onCellClick }) => {
  return (
    <div className="flex-1 flex justify-center">
      <div className="grid grid-cols-9 gap-0 border-4 border-surface-800 rounded-lg overflow-hidden bg-white">
        {sudokuData.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
              isRelated={selectedCell && (selectedCell.row === rowIndex || selectedCell.col === colIndex)}
              isEmpty={cell === 0}
              row={rowIndex}
              col={colIndex}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameGrid;