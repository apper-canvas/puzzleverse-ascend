import React from 'react';
import Text from './Text';

const ProgressBar = ({ progress, label = 'Progress' }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Text as="span" className="text-sm font-medium text-surface-600">{label}</Text>
        <Text as="span" className="text-sm font-medium text-surface-900">{progress}%</Text>
      </div>
      <div className="w-full bg-surface-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;