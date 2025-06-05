import React from 'react';
import NavItem from './NavItem';

const PuzzleTypeSelector = ({ puzzleTypes, sidebarExpanded }) => {
  return (
    <nav className="space-y-2">
      {puzzleTypes.map((puzzle) => (
        <NavItem key={puzzle.id} puzzle={puzzle} expanded={sidebarExpanded} />
      ))}
    </nav>
  );
};

export default PuzzleTypeSelector;