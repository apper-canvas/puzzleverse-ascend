import React from 'react';

const Title = ({ children, className = '', as = 'h1', ...props }) => {
  const Tag = as;
  const baseClasses = 'font-heading font-bold'; // Common classes for titles
  return (
    <Tag className={`${baseClasses} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Title;