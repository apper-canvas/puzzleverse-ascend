import React from 'react';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const TooltipButton = ({ iconName, tooltipText, onClick, className = '' }) => {
  return (
    <div className="relative group">
      <Button 
        onClick={onClick} 
        className={`p-2 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors ${className}`}
      >
        <Icon name={iconName} className="w-6 h-6 text-surface-600" />
      </Button>
      <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-surface-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        <Text as="span">{tooltipText}</Text>
      </div>
    </div>
  );
};

export default TooltipButton;