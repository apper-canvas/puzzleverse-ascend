import React from 'react';
import Logo from '../atoms/Logo';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import PuzzleTypeSelector from '../molecules/PuzzleTypeSelector';

const Sidebar = ({ expanded, onToggleExpand, puzzleTypes }) => {
  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-2xl transition-all duration-300 z-40 ${
      expanded ? 'w-72' : 'w-20'
    }`}>
      <div className="p-4">
        <Logo expanded={expanded} />
        <PuzzleTypeSelector puzzleTypes={puzzleTypes} sidebarExpanded={expanded} />
        <Button
          onClick={onToggleExpand}
          className="sidebar-toggle"
        >
          <Icon 
            name={expanded ? "ChevronLeft" : "ChevronRight"} 
            className="w-4 h-4 text-surface-600" 
          />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;