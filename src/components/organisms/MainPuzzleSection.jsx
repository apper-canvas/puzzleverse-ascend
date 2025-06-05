import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { puzzleService } from '../../services';
import SudokuControls from './SudokuControls';
import GameGrid from './GameGrid';
import NumberPad from '../molecules/NumberPad';
import GameStats from './GameStats';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

const MainPuzzleSection = ({ difficulty }) => {
  const [sudokuData, setSudokuData] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    loadNewPuzzle();
  }, [difficulty]);

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

  const generateEmptyGrid = () => {
    const grid = Array(9).fill().map(() => Array(9).fill(0));
    
    const presetCounts = {
      easy: 35,
      medium: 28,
      hard: 22,
      expert: 17
    };
    
    const presetCount = presetCounts[difficulty] || 28;
    const positions = [];
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        positions.push([i, j]);
      }
    }
    
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    
    for (let i = 0; i < presetCount; i++) {
      const [row, col] = positions[i];
      grid[row][col] = Math.floor(Math.random() * 9) + 1;
    }
    
    return grid;
  };

  const loadNewPuzzle = async () => {
    setLoading(true);
    setError(null);
    try {
      const puzzles = await puzzleService.getAll();
      const difficultyPuzzles = puzzles.filter(p => p.type === 'sudoku' && p.difficulty === difficulty) || [];
      
      if (difficultyPuzzles.length > 0) {
        const randomPuzzle = difficultyPuzzles[Math.floor(Math.random() * difficultyPuzzles.length)];
        setSudokuData(randomPuzzle.data || generateEmptyGrid());
      } else {
        setSudokuData(generateEmptyGrid());
      }
      
      setTimer(0);
      setIsPlaying(false);
      setSelectedCell(null);
      setProgress(0);
      setMistakes(0);
    } catch (err) {
      setError(err.message);
      setSudokuData(generateEmptyGrid());
    } finally {
      setLoading(false);
    }
  };

  const handleCellClick = (row, col) => {
    if (!isPlaying) setIsPlaying(true);
    setSelectedCell({ row, col });
  };

  const handleNumberInput = (number) => {
    if (!selectedCell || sudokuData[selectedCell.row]?.[selectedCell.col] === undefined) return;

    const newGrid = sudokuData.map(row => [...row]);
    const oldValue = newGrid[selectedCell.row][selectedCell.col];
    
    if (oldValue === number) {
      newGrid[selectedCell.row][selectedCell.col] = 0;
    } else {
      newGrid[selectedCell.row][selectedCell.col] = number;
    }

    setSudokuData(newGrid);
    
    const filledCells = newGrid.flat().filter(cell => cell !== 0).length;
    const newProgress = Math.round((filledCells / 81) * 100);
    setProgress(newProgress);

    if (filledCells === 81) {
      setIsPlaying(false);
      if (isValidSolution(newGrid)) {
        toast.success("🎉 Congratulations! Puzzle completed successfully!");
      } else {
        toast.error("Puzzle completed but contains errors. Keep trying!");
        setMistakes(prev => prev + 1);
      }
    }
  };

  const isValidSolution = (grid) => {
    for (let i = 0; i < 9; i++) {
      const rowSet = new Set();
      const colSet = new Set();
      
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] !== 0) rowSet.add(grid[i][j]);
        if (grid[j][i] !== 0) colSet.add(grid[j][i]);
      }
      
      if (rowSet.size !== 9 || colSet.size !== 9) return false;
    }
    return true;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <Text as="p" className="text-surface-600">Loading your puzzle...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Icon name="AlertTriangle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <Text as="p" className="text-red-600 mb-4">Error loading puzzle: {error}</Text>
        <Button onClick={loadNewPuzzle} className="btn-primary">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="xl:col-span-3">
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <SudokuControls 
          timer={timer} 
          isPlaying={isPlaying} 
          onTogglePlay={() => setIsPlaying(!isPlaying)} 
          onNewPuzzle={loadNewPuzzle} 
          progress={progress} 
        />

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <GameGrid 
            sudokuData={sudokuData} 
            selectedCell={selectedCell} 
            onCellClick={handleCellClick} 
          />
          <NumberPad onNumberInput={handleNumberInput} selectedCell={selectedCell} />
        </div>

        <GameStats difficulty={difficulty} mistakes={mistakes} />
      </div>
    </div>
  );
};

export default MainPuzzleSection;