import React from 'react';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const StatBadge = ({ iconName, text, value, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon name={iconName} className="w-4 h-4" />
      <Text as="span">
        {text}: <Text as="span" className="font-semibold">{value}</Text>
      </Text>
    </div>
  );
};

export default StatBadge;