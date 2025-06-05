import React from 'react';
import Title from '../atoms/Title';
import Text from '../atoms/Text';

const PlaceholderCard = ({ title, content, message }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft">
      <Title as="h3" className="text-lg text-surface-900 mb-4">{title}</Title>
      {content}
      <Text as="p" className="text-center text-surface-500 text-sm mt-4">{message}</Text>
    </div>
  );
};

export default PlaceholderCard;