import React from 'react';

const Input = ({ value, onChange, type = 'text', placeholder = '', className = '', ...props }) => {
  const baseClasses = 'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary';
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
};

export default Input;