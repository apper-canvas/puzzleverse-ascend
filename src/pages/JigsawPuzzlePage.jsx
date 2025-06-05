import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jigsawService } from '../services';
import JigsawCanvas from '../components/organisms/JigsawCanvas';
import PieceTray from '../components/organisms/PieceTray';
import ThumbnailPreview from '../components/organisms/ThumbnailPreview';
import Icon from '../components/atoms/Icon';
import Button from '../components/atoms/Button';
import Title from '../components/atoms/Title';
import Text from '../components/atoms/Text';

const JigsawPuzzlePage = () => {
  const { puzzleId } = useParams();
  const navigate = useNavigate();
  
  const [puzzle, setPuzzle] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (puzzleId) {
      initializePuzzle(puzzleId);
    }
  }, [puzzleId]);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else if (!isPlaying && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  const initializePuzzle = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await jigsawService.initializePuzzle(id);
      setPuzzle(result.puzzle);
      setGameState(result.gameState);
      setTimer(0);
      setIsPlaying(false);
      setSelectedPiece(null);
      toast.success(`Puzzle "${result.puzzle.title}" loaded successfully!`);
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to load puzzle: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePiecePlaced = async (pieceId, x, y) => {
    if (!isPlaying) setIsPlaying(true);
    
    try {
      const result = await jigsawService.placePiece(pieceId, x, y);
      setGameState(result.gameState);
      
      if (result.placed) {
        toast.success('Perfect! Piece placed correctly!');
        
        // Check for completion
        const completion = await jigsawService.checkCompletion();
        if (completion.isComplete) {
          setIsPlaying(false);
          toast.success('🎉 Congratulations! Puzzle completed!', {
            autoClose: 5000
          });
        }
      }
    } catch (error) {
      toast.error(`Error placing piece: ${error.message}`);
    }
  };

  const handlePieceRotated = async (pieceId, direction) => {
    try {
      await jigsawService.rotatePiece(pieceId, direction);
      // Update the piece in both tray and placed pieces
      if (gameState) {
        const updatedTray = gameState.trayPieces.map(piece => 
          piece.id === pieceId 
            ? { ...piece, rotation: (piece.rotation + (direction === 'clockwise' ? 90 : -90)) % 360 }
            : piece
        );
        const updatedPlaced = gameState.placedPieces.map(piece => 
          piece.id === pieceId 
            ? { ...piece, rotation: (piece.rotation + (direction === 'clockwise' ? 90 : -90)) % 360 }
            : piece
        );
        
        setGameState({
          ...gameState,
          trayPieces: updatedTray,
          placedPieces: updatedPlaced
        });
      }
      toast.info(`Piece rotated ${direction}`);
    } catch (error) {
      toast.error(`Error rotating piece: ${error.message}`);
    }
  };

  const handlePieceSelected = (piece) => {
    setSelectedPiece(piece);
  };

  const handleHint = async () => {
    try {
      const hint = await jigsawService.getHint();
      return hint;
    } catch (error) {
      toast.error(`Error getting hint: ${error.message}`);
      return null;
    }
  };

  const handleNewPuzzle = () => {
    if (gameState?.placedCount > 0) {
      if (window.confirm('Are you sure you want to start a new puzzle? Your current progress will be lost.')) {
        initializePuzzle(puzzleId);
      }
    } else {
      initializePuzzle(puzzleId);
    }
  };

  const handleBackToHome = () => {
    if (gameState?.placedCount > 0) {
      if (window.confirm('Are you sure you want to go back? Your current progress will be lost.')) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <Text as="p" className="text-surface-600">Loading your jigsaw puzzle...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertTriangle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <Text as="p" className="text-red-600 mb-4">Error loading puzzle: {error}</Text>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => initializePuzzle(puzzleId)} className="btn-primary">
              Try Again
            </Button>
            <Button onClick={handleBackToHome} className="btn-secondary">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleBackToHome}
                className="p-2 hover:bg-surface-100 rounded-lg transition-colors duration-200"
              >
                <Icon name="ArrowLeft" className="w-5 h-5 text-surface-600" />
              </Button>
              <div>
                <Title as="h1" className="text-xl font-bold text-surface-800">
                  {puzzle?.title || 'Jigsaw Puzzle'}
                </Title>
                {puzzle?.description && (
                  <Text as="p" className="text-sm text-surface-600">
                    {puzzle.description}
                  </Text>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className="text-right">
                <Text as="p" className="text-sm text-surface-600">Time</Text>
                <Text as="p" className="font-mono text-lg font-semibold text-surface-800">
                  {formatTime(timer)}
                </Text>
              </div>
              
              {/* Controls */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-primary text-white hover:bg-primary-dark rounded-lg transition-colors duration-200"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} className="w-5 h-5" />
                </Button>
                <Button
                  onClick={handleNewPuzzle}
                  className="p-2 bg-surface-100 text-surface-600 hover:bg-surface-200 rounded-lg transition-colors duration-200"
                  title="New puzzle"
                >
                  <Icon name="RotateCcw" className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Canvas area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <JigsawCanvas
                puzzle={puzzle}
                gameState={gameState}
                onPiecePlaced={handlePiecePlaced}
                onPieceRotated={handlePieceRotated}
                onPieceSelected={handlePieceSelected}
                selectedPiece={selectedPiece}
                onHint={handleHint}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Thumbnail preview */}
            <ThumbnailPreview
              puzzle={puzzle}
              gameState={gameState}
              showGrid={true}
              showProgress={true}
            />

            {/* Piece tray */}
            <PieceTray
              pieces={gameState?.trayPieces || []}
              onPieceSelected={handlePieceSelected}
              selectedPiece={selectedPiece}
              onPieceRotated={handlePieceRotated}
            />

            {/* Game stats */}
            {gameState && (
              <div className="bg-white rounded-xl shadow-soft p-4">
                <h3 className="text-lg font-semibold text-surface-800 mb-3">
                  Game Statistics
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-surface-600">Pieces placed:</span>
                    <span className="font-medium">{gameState.placedCount} / {gameState.totalPieces}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600">Progress:</span>
                    <span className="font-medium">
                      {Math.round((gameState.placedCount / gameState.totalPieces) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600">Rotations:</span>
                    <span className="font-medium">{gameState.rotations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600">Hints used:</span>
                    <span className="font-medium">{gameState.hints}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JigsawPuzzlePage;