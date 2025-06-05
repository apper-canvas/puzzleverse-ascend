import React from 'react';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Title from '../atoms/Title';
import Text from '../atoms/Text';

const NumberPad = ({ onNumberInput, selectedCell }) => {
  return (
    <div className="w-full lg:w-auto">
      <Title as="h4" className="text-lg text-surface-900 mb-4 text-center lg:text-left">Number Pad</Title>
      <div className="grid grid-cols-5 lg:grid-cols-3 gap-2 max-w-xs mx-auto lg:mx-0">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <Button
            key={number}
            onClick={() => onNumberInput(number)}
            className="number-pad-btn"
            disabled={!selectedCell}
          >
            {number}
          </Button>
        ))}
        <Button
          onClick={() => onNumberInput(0)}
          className="number-pad-btn col-span-2 lg:col-span-3"
          disabled={!selectedCell}
        >
          <Icon name="Eraser" className="w-5 h-5 mr-2" />
          Erase
        </Button>
      </div>
      
      {selectedCell && (
        <Text as="p" className="text-sm text-surface-500 text-center lg:text-left mt-3">
          Selected: Row {selectedCell.row + 1}, Column {selectedCell.col + 1}
        </Text>
      )}
    </div>
  );
};

export default NumberPad;