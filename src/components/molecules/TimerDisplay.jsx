import React from 'react';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

const TimerDisplay = ({ time, isPlaying, onTogglePlay, className = '' }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`glass rounded-xl px-4 py-2 flex items-center gap-2 ${className}`}>
      <Icon name="Clock" className="w-5 h-5 text-surface-600" />
      <Text as="span" className="font-mono text-lg font-semibold">{formatTime(time)}</Text>
      <Button
        onClick={onTogglePlay}
        className="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded"
      >
        <Icon name={isPlaying ? "Pause" : "Play"} className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TimerDisplay;