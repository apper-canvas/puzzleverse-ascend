import React, { useState } from 'react';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';

const ThumbnailPreview = ({ 
  puzzle, 
  gameState, 
  showGrid = true, 
  showProgress = true 
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showPieceNumbers, setShowPieceNumbers] = useState(false);

  if (!puzzle) {
    return (
      <div className="thumbnail-preview bg-surface-100 h-48 flex items-center justify-center">
        <p className="text-surface-500 text-sm">No puzzle selected</p>
      </div>
    );
  }

  const completionPercentage = gameState 
    ? Math.round((gameState.placedCount / gameState.totalPieces) * 100)
    : 0;

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const togglePieceNumbers = () => {
    setShowPieceNumbers(!showPieceNumbers);
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-surface-800">
          Reference Image
        </h3>
        <div className="flex gap-2">
          <Button
            onClick={togglePieceNumbers}
            className={`p-2 text-xs rounded-md transition-colors duration-200 ${
              showPieceNumbers 
                ? 'bg-primary text-white' 
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }`}
            title="Toggle piece numbers"
          >
            <Icon name="Hash" className="w-4 h-4" />
          </Button>
          <Button
            onClick={toggleZoom}
            className="p-2 bg-surface-100 text-surface-600 hover:bg-surface-200 rounded-md transition-colors duration-200"
            title={isZoomed ? 'Zoom out' : 'Zoom in'}
          >
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Image container */}
      <div className={`
        thumbnail-preview relative overflow-hidden transition-all duration-300
        ${isZoomed ? 'h-96' : 'h-48'}
      `}>
        <img
          src={puzzle.imageUrl || puzzle.thumbnailUrl}
          alt={puzzle.title}
          className={`
            w-full h-full object-cover transition-transform duration-300
            ${isZoomed ? 'scale-110 hover:scale-125' : 'scale-100'}
          `}
          style={{ cursor: isZoomed ? 'move' : 'zoom-in' }}
          onClick={toggleZoom}
        />
        
        {/* Grid overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Vertical lines */}
              {Array.from({ length: puzzle.cols - 1 }, (_, i) => (
                <line
                  key={`v${i}`}
                  x1={((i + 1) / puzzle.cols) * 100}
                  y1="0"
                  x2={((i + 1) / puzzle.cols) * 100}
                  y2="100"
                  stroke="rgba(255, 255, 255, 0.6)"
                  strokeWidth="0.5"
                />
              ))}
              {/* Horizontal lines */}
              {Array.from({ length: puzzle.rows - 1 }, (_, i) => (
                <line
                  key={`h${i}`}
                  x1="0"
                  y1={((i + 1) / puzzle.rows) * 100}
                  x2="100"
                  y2={((i + 1) / puzzle.rows) * 100}
                  stroke="rgba(255, 255, 255, 0.6)"
                  strokeWidth="0.5"
                />
              ))}
            </svg>
          </div>
        )}

        {/* Piece numbers overlay */}
        {showPieceNumbers && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {Array.from({ length: puzzle.rows }, (_, row) =>
                Array.from({ length: puzzle.cols }, (_, col) => (
                  <text
                    key={`${row}-${col}`}
                    x={((col + 0.5) / puzzle.cols) * 100}
                    y={((row + 0.5) / puzzle.rows) * 100}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="2"
                    fill="rgba(255, 255, 255, 0.9)"
                    stroke="rgba(0, 0, 0, 0.5)"
                    strokeWidth="0.2"
                  >
                    {row}-{col}
                  </text>
                ))
              )}
            </svg>
          </div>
        )}

        {/* Progress overlay */}
        {showProgress && gameState && (
          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            {completionPercentage}% Complete
          </div>
        )}

        {/* Placed pieces highlight */}
        {gameState?.placedPieces && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {gameState.placedPieces.map(piece => (
                <rect
                  key={piece.id}
                  x={(piece.col / puzzle.cols) * 100}
                  y={(piece.row / puzzle.rows) * 100}
                  width={(1 / puzzle.cols) * 100}
                  height={(1 / puzzle.rows) * 100}
                  fill="rgba(34, 197, 94, 0.3)"
                  stroke="rgba(34, 197, 94, 0.8)"
                  strokeWidth="0.5"
                />
              ))}
            </svg>
          </div>
        )}
      </div>

      {/* Puzzle info */}
      <div className="mt-3 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-surface-600">Difficulty:</span>
          <span className={`font-medium capitalize ${
            puzzle.difficulty === 'easy' ? 'text-green-600' :
            puzzle.difficulty === 'medium' ? 'text-yellow-600' :
            puzzle.difficulty === 'hard' ? 'text-orange-600' :
            'text-red-600'
          }`}>
            {puzzle.difficulty}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-surface-600">Size:</span>
          <span className="font-medium text-surface-800">
            {puzzle.rows} × {puzzle.cols} ({puzzle.totalPieces} pieces)
          </span>
        </div>

        {puzzle.estimatedTime && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-surface-600">Est. Time:</span>
            <span className="font-medium text-surface-800">
              {puzzle.estimatedTime}
            </span>
          </div>
        )}

        {/* Progress bar */}
        {showProgress && gameState && (
          <div className="mt-3">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-surface-600">Progress:</span>
              <span className="font-medium text-surface-800">
                {gameState.placedCount} / {gameState.totalPieces}
              </span>
            </div>
            <div className="w-full bg-surface-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailPreview;