import React from 'react';
import TimerDisplay from '../molecules/TimerDisplay';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import ProgressBar from '../atoms/ProgressBar';
import Title from '../atoms/Title';
import Text from '../atoms/Text';

const SudokuControls = ({ 
  timer, 
  isPlaying, 
  onTogglePlay, 
  onNewPuzzle, 
  progress 
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <Title as="h3" className="text-2xl text-surface-900 mb-1">Sudoku</Title>
          <Text as="p" className="text-surface-600">Fill the grid so each row, column, and 3×3 box contains 1-9</Text>
        </div>
        
        <div className="flex items-center gap-4">
          <TimerDisplay time={timer} isPlaying={isPlaying} onTogglePlay={onTogglePlay} />
          <Button onClick={onNewPuzzle} className="btn-secondary">
            <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
            New Puzzle
          </Button>
        </div>
      </div>

      <ProgressBar progress={progress} />
    </>
  );
};

export default SudokuControls;