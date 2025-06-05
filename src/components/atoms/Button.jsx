import React from 'react';

const Button = ({ children, onClick, className = '', disabled = false, type = 'button' }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200';
  
  // Apply specific button styles based on common usage
  let specificClasses = '';
  if (className.includes('btn-primary')) {
    specificClasses = 'bg-primary text-white px-6 py-3 hover:bg-primary-dark transform hover:scale-105 shadow-lg';
  } else if (className.includes('btn-secondary')) {
    specificClasses = 'bg-surface-100 text-surface-700 px-4 py-2 hover:bg-surface-200';
  } else if (className.includes('number-pad-btn')) {
    specificClasses = 'bg-surface-100 hover:bg-surface-200 text-surface-900 text-2xl py-3 rounded-xl transform hover:scale-105';
  } else if (className.includes('sidebar-toggle')) {
    specificClasses = 'absolute -right-4 top-8 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-surface-50';
  } else {
    // Default styling if no specific btn-* class is provided
    specificClasses = 'px-4 py-2 bg-blue-500 text-white hover:bg-blue-600'; // Fallback or general button
  }

  // Add disabled styles
  if (disabled) {
    specificClasses += ' opacity-50 cursor-not-allowed';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${specificClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;