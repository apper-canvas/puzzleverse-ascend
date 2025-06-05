import React from 'react';
import Title from '../atoms/Title';
import Text from '../atoms/Text';
import Select from '../atoms/Select';
import Badge from '../atoms/Badge';
import TooltipButton from '../molecules/TooltipButton';

const TopBar = ({ difficulty, onDifficultyChange, difficultyOptions }) => {
  const currentDifficultyOption = difficultyOptions.find(opt => opt.value === difficulty);

  return (
    <header className="bg-white shadow-sm border-b border-surface-100 px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Title as="h2" className="text-2xl text-surface-900">Daily Puzzles</Title>
          <Text as="p" className="text-surface-600">Challenge your mind, one puzzle at a time</Text>
        </div>
        
        <div className="flex items-center gap-4">
          <Select
            value={difficulty}
            onChange={onDifficultyChange}
            options={difficultyOptions}
          />
          <Badge 
            colorClass={currentDifficultyOption?.color} 
            textClass="capitalize"
          >
            {difficulty}
          </Badge>

          <TooltipButton 
            iconName="Trophy" 
            tooltipText="Unlock achievements soon! (0/50)" 
          />
          <TooltipButton 
            iconName="Settings" 
            tooltipText="Customization options coming soon!" 
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;