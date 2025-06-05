import React, { useState } from 'react';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const PieceTray = ({ 
  pieces = [], 
  onPieceDragStart, 
  onPieceSelected, 
  selectedPiece,
  onPieceRotated 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');

  const filteredPieces = pieces.filter(piece => 
    piece.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPieces = filteredPieces.sort((a, b) => {
    switch (sortBy) {
      case 'id':
        return a.id.localeCompare(b.id);
      case 'row':
        return a.row - b.row;
      case 'col':
        return a.col - b.col;
      default:
        return 0;
    }
  });

  const handlePieceClick = (piece) => {
    onPieceSelected?.(piece);
  };

  const handlePieceDoubleClick = (piece) => {
    onPieceRotated?.(piece.id, 'clockwise');
  };

  const handleDragStart = (e, piece) => {
    e.dataTransfer.setData('application/json', JSON.stringify(piece));
    onPieceDragStart?.(piece);
  };

  const renderPiece = (piece) => {
    const isSelected = selectedPiece?.id === piece.id;
    const rotation = piece.rotation || 0;
    
    return (
      <div
        key={piece.id}
        className={`
          piece-slot occupied cursor-pointer transform transition-all duration-200 
          hover:scale-105 hover:shadow-md
          ${isSelected ? 'ring-2 ring-primary ring-opacity-50' : ''}
        `}
        draggable
        onDragStart={(e) => handleDragStart(e, piece)}
        onClick={() => handlePieceClick(piece)}
        onDoubleClick={() => handlePieceDoubleClick(piece)}
        style={{
          transform: `rotate(${rotation}deg) ${isSelected ? 'scale(1.05)' : ''}`,
        }}
        title={`Piece ${piece.id} (${piece.row}, ${piece.col})`}
      >
        <div className="w-full h-full bg-surface-100 border-2 border-surface-300 rounded-md flex items-center justify-center relative overflow-hidden">
          {/* Simplified piece representation */}
          <div className="w-12 h-8 bg-gradient-to-br from-blue-100 to-blue-200 border border-surface-400 rounded-sm flex items-center justify-center">
            <span className="text-xs font-medium text-surface-700">
              {piece.id.split('-').join('')}
            </span>
          </div>
          
          {/* Edge indicators */}
          <div className="absolute inset-0 pointer-events-none">
            {piece.edges?.top === 'out' && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
            )}
            {piece.edges?.right === 'out' && (
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
            )}
            {piece.edges?.bottom === 'out' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
            )}
            {piece.edges?.left === 'out' && (
              <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-surface-800">
          Piece Tray ({pieces.length} pieces)
        </h3>
        <Icon name="Package" className="w-5 h-5 text-surface-500" />
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search pieces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="id">Sort by ID</option>
          <option value="row">Sort by Row</option>
          <option value="col">Sort by Column</option>
        </select>
      </div>

      {/* Selected piece info */}
      {selectedPiece && (
        <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">
              Selected: Piece {selectedPiece.id}
            </span>
            <div className="flex gap-1">
              <Button
                onClick={() => onPieceRotated?.(selectedPiece.id, 'counterclockwise')}
                className="p-1 text-xs bg-white hover:bg-surface-50 border border-surface-300 rounded"
                title="Rotate left"
              >
                <Icon name="RotateCcw" className="w-3 h-3" />
              </Button>
              <Button
                onClick={() => onPieceRotated?.(selectedPiece.id, 'clockwise')}
                className="p-1 text-xs bg-white hover:bg-surface-50 border border-surface-300 rounded"
                title="Rotate right"
              >
                <Icon name="RotateCw" className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="text-xs text-surface-600">
            Position: Row {selectedPiece.row + 1}, Column {selectedPiece.col + 1}
            {selectedPiece.rotation !== 0 && (
              <span className="ml-2">• Rotated {selectedPiece.rotation}°</span>
            )}
          </div>
        </div>
      )}

      {/* Pieces grid */}
      <div className="piece-tray max-h-96 overflow-y-auto">
        {sortedPieces.length > 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
            {sortedPieces.map(renderPiece)}
          </div>
        ) : (
          <div className="text-center py-8 text-surface-500">
            {searchTerm ? 'No pieces match your search' : 'No pieces available'}
          </div>
        )}
      </div>

      {/* Tray instructions */}
      <div className="mt-4 p-3 bg-surface-50 rounded-lg">
        <p className="text-xs text-surface-600 text-center">
          Drag pieces to the canvas • Double-click to rotate • Click to select
        </p>
      </div>
    </div>
  );
};

export default PieceTray;