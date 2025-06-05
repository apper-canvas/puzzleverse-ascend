import React from 'react';
import Text from './Text';

const Badge = ({ children, colorClass = '', textClass = '' }) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
      <Text as="span" className={`text-sm font-medium text-surface-600 capitalize ${textClass}`}>
        {children}
      </Text>
    </div>
  );
};

export default Badge;