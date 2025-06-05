import React, { useRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const JigsawCanvas = ({ 
  puzzle, 
  gameState, 
  onPiecePlaced, 
  onPieceRotated, 
  onPieceSelected, 
  selectedPiece,
  onHint 
}) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPiece, setDragPiece] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hintHighlight, setHintHighlight] = useState(null);

  useEffect(() => {
    if (!canvasRef.current || !puzzle) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background grid
    drawGrid(ctx);
    
    // Draw placed pieces
    if (gameState?.placedPieces) {
      gameState.placedPieces.forEach(piece => {
        drawPiece(ctx, piece, false);
      });
    }
    
    // Draw hint highlight if active
    if (hintHighlight) {
      drawHintHighlight(ctx, hintHighlight);
    }
    
    // Draw selected piece outline
    if (selectedPiece && gameState?.placedPieces.some(p => p.id === selectedPiece.id)) {
      drawPieceOutline(ctx, selectedPiece);
    }
    
  }, [puzzle, gameState, selectedPiece, hintHighlight]);

  const drawGrid = (ctx) => {
    if (!puzzle) return;
    
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    const pieceWidth = 600 / puzzle.cols;
    const pieceHeight = 400 / puzzle.rows;
    
    // Vertical lines
    for (let i = 0; i <= puzzle.cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * pieceWidth, 0);
      ctx.lineTo(i * pieceWidth, 400);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let i = 0; i <= puzzle.rows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * pieceHeight);
      ctx.lineTo(600, i * pieceHeight);
      ctx.stroke();
    }
  };

  const drawPiece = (ctx, piece, isHover = false) => {
    ctx.save();
    
    // Apply transformations
    const centerX = piece.currentX + piece.width / 2;
    const centerY = piece.currentY + piece.height / 2;
    
    ctx.translate(centerX, centerY);
    ctx.rotate(piece.rotation * Math.PI / 180);
    ctx.translate(-piece.width / 2, -piece.height / 2);
    
    // Draw piece background
    ctx.fillStyle = isHover ? '#e0f2fe' : '#ffffff';
    ctx.fillRect(0, 0, piece.width, piece.height);
    
    // Draw piece border
    ctx.strokeStyle = piece.isPlaced ? '#10b981' : '#6b7280';
    ctx.lineWidth = piece.isPlaced ? 3 : 2;
    ctx.strokeRect(0, 0, piece.width, piece.height);
    
    // Draw piece edges (simplified)
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    drawPieceEdges(ctx, piece);
    
    // Draw piece number for identification
    ctx.fillStyle = '#374151';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(piece.id, piece.width / 2, piece.height / 2);
    
    ctx.restore();
  };

  const drawPieceEdges = (ctx, piece) => {
    const { edges, width, height } = piece;
    const tab = 8; // Tab size
    
    ctx.beginPath();
    
    // Top edge
    ctx.moveTo(0, 0);
    if (edges.top === 'out') {
      ctx.lineTo(width/2 - tab, 0);
      ctx.arc(width/2, -tab/2, tab/2, Math.PI, 0);
      ctx.lineTo(width/2 + tab, 0);
    } else if (edges.top === 'in') {
      ctx.lineTo(width/2 - tab, 0);
      ctx.arc(width/2, tab/2, tab/2, 0, Math.PI);
      ctx.lineTo(width/2 + tab, 0);
    }
    ctx.lineTo(width, 0);
    
    // Right edge
    if (edges.right === 'out') {
      ctx.lineTo(width, height/2 - tab);
      ctx.arc(width + tab/2, height/2, tab/2, Math.PI * 1.5, Math.PI * 0.5);
      ctx.lineTo(width, height/2 + tab);
    } else if (edges.right === 'in') {
      ctx.lineTo(width, height/2 - tab);
      ctx.arc(width - tab/2, height/2, tab/2, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(width, height/2 + tab);
    }
    ctx.lineTo(width, height);
    
    // Bottom edge
    if (edges.bottom === 'out') {
      ctx.lineTo(width/2 + tab, height);
      ctx.arc(width/2, height + tab/2, tab/2, 0, Math.PI);
      ctx.lineTo(width/2 - tab, height);
    } else if (edges.bottom === 'in') {
      ctx.lineTo(width/2 + tab, height);
      ctx.arc(width/2, height - tab/2, tab/2, Math.PI, 0);
      ctx.lineTo(width/2 - tab, height);
    }
    ctx.lineTo(0, height);
    
    // Left edge
    if (edges.left === 'out') {
      ctx.lineTo(0, height/2 + tab);
      ctx.arc(-tab/2, height/2, tab/2, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(0, height/2 - tab);
    } else if (edges.left === 'in') {
      ctx.lineTo(0, height/2 + tab);
      ctx.arc(tab/2, height/2, tab/2, Math.PI * 1.5, Math.PI * 0.5);
      ctx.lineTo(0, height/2 - tab);
    }
    ctx.lineTo(0, 0);
    
    ctx.stroke();
  };

  const drawHintHighlight = (ctx, hint) => {
    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 5]);
    ctx.strokeRect(hint.x, hint.y, hint.width, hint.height);
    
    // Add pulsing effect
    ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
    ctx.fillRect(hint.x, hint.y, hint.width, hint.height);
    ctx.restore();
  };

  const drawPieceOutline = (ctx, piece) => {
    ctx.save();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(piece.currentX, piece.currentY, piece.width, piece.height);
    ctx.restore();
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const findPieceAtPosition = (x, y) => {
    if (!gameState?.placedPieces) return null;
    
    // Check in reverse order (top pieces first)
    for (let i = gameState.placedPieces.length - 1; i >= 0; i--) {
      const piece = gameState.placedPieces[i];
      if (x >= piece.currentX && x <= piece.currentX + piece.width &&
          y >= piece.currentY && y <= piece.currentY + piece.height) {
        return piece;
      }
    }
    return null;
  };

  const handleMouseDown = (e) => {
    const pos = getMousePos(e);
    const piece = findPieceAtPosition(pos.x, pos.y);
    
    if (piece) {
      setIsDragging(true);
      setDragPiece(piece);
      setDragOffset({
        x: pos.x - piece.currentX,
        y: pos.y - piece.currentY
      });
      onPieceSelected?.(piece);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragPiece) return;
    
    const pos = getMousePos(e);
    const newX = pos.x - dragOffset.x;
    const newY = pos.y - dragOffset.y;
    
    // Update piece position temporarily for visual feedback
    dragPiece.currentX = newX;
    dragPiece.currentY = newY;
    
    // Force re-render
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, 600, 400);
      drawGrid(ctx);
      
      gameState.placedPieces.forEach(piece => {
        drawPiece(ctx, piece, piece.id === dragPiece.id);
      });
    }
  };

  const handleMouseUp = (e) => {
    if (!isDragging || !dragPiece) return;
    
    const pos = getMousePos(e);
    const finalX = pos.x - dragOffset.x;
    const finalY = pos.y - dragOffset.y;
    
    // Check if piece should be placed
    onPiecePlaced?.(dragPiece.id, finalX, finalY);
    
    setIsDragging(false);
    setDragPiece(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleDoubleClick = (e) => {
    const pos = getMousePos(e);
    const piece = findPieceAtPosition(pos.x, pos.y);
    
    if (piece) {
      onPieceRotated?.(piece.id, 'clockwise');
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    const pos = getMousePos(e);
    const piece = findPieceAtPosition(pos.x, pos.y);
    
    if (piece) {
      onPieceRotated?.(piece.id, 'counterclockwise');
    }
  };

  const showHint = async () => {
    if (onHint) {
      try {
        const hint = await onHint();
        if (hint?.correctPosition) {
          setHintHighlight({
            x: hint.correctPosition.x,
            y: hint.correctPosition.y,
            width: hint.piece.width,
            height: hint.piece.height
          });
          
          setTimeout(() => setHintHighlight(null), 3000);
          toast.info(`Hint: Look for piece ${hint.piece.id} in this location!`);
        }
      } catch (error) {
        toast.error('Unable to get hint at this time');
      }
    }
  };

  if (!puzzle) {
    return (
      <div className="jigsaw-canvas h-96 flex items-center justify-center">
        <p className="text-surface-500">Select a puzzle to begin</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="jigsaw-canvas w-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleRightClick}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      />
      
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={showHint}
          className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200 text-sm font-medium"
        >
          Hint
        </button>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-2 text-xs text-surface-600">
        <p>• Drag pieces to move • Double-click or right-click to rotate</p>
      </div>
    </div>
  );
};

export default JigsawCanvas;