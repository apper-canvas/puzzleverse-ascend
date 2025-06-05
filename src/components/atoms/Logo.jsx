import React from 'react';
import Icon from './Icon';
import Title from './Title';

const Logo = ({ expanded }) => {
  return (
    <div className="flex items-center mb-8">
      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
        <Icon name="Puzzle" className="w-6 h-6 text-white" />
      </div>
      {expanded && (
        <div className="ml-3">
          <Title as="h1" className="text-xl gradient-text">PuzzleVerse</Title>
        </div>
      )}
    </div>
  );
};

export default Logo;