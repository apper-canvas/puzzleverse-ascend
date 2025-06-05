import React from 'react';
import StatBadge from '../molecules/StatBadge';
import Text from '../atoms/Text';

const GameStats = ({ difficulty, mistakes }) => {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-surface-600">
      <StatBadge iconName="Target" text="Difficulty" value={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} />
      <StatBadge iconName="AlertCircle" text="Mistakes" value={mistakes} />
      <StatBadge iconName="Zap" text="Hints" value="Coming soon!" />
    </div>
  );
};

export default GameStats;