import React from 'react';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const NavItem = ({ puzzle, expanded, onClick }) => {
  const itemClasses = `flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
    puzzle.available 
      ? 'hover:bg-surface-100 text-surface-700 hover:text-primary' 
      : 'text-surface-400 cursor-not-allowed'
  }`;

  const handleClick = () => {
    if (puzzle.available && onClick) {
      onClick(puzzle);
    }
  };

return (
    <div className="relative group">
      <div className={itemClasses} onClick={handleClick}>
        <Icon name={puzzle.icon} className={`w-6 h-6 ${puzzle.color}`} />
        {expanded && (
          <Text as="span" className="ml-3 font-medium">{puzzle.name}</Text>
        )}
        {!puzzle.available && !expanded && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-surface-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Coming soon!
          </div>
        )}
      </div>
      {!puzzle.available && expanded && (
        <Text as="div" className="ml-9 text-xs text-surface-400">Coming soon!</Text>
      )}
    </div>
  );
};

export default NavItem;