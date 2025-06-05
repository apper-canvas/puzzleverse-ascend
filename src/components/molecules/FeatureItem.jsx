import React from 'react';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const FeatureItem = ({ iconName, text, iconColor }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white bg-opacity-50 rounded-lg">
      <Icon name={iconName} className={`w-5 h-5 ${iconColor}`} />
      <Text as="span" className="text-sm font-medium">{text}</Text>
    </div>
  );
};

export default FeatureItem;