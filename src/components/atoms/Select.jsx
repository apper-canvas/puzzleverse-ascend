import React from 'react';
import Icon from './Icon';

const Select = ({ value, onChange, options = [], className = '' }) => {
  const baseClasses = 'appearance-none bg-white border-2 border-surface-200 rounded-xl px-4 py-2 pr-10 font-medium text-surface-700 focus:border-primary focus:outline-none hover:border-surface-300 transition-colors';
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${className}`}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="ChevronDown" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500 pointer-events-none" />
    </div>
  );
};

export default Select;