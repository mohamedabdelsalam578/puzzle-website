import React, { useState } from 'react';

interface GateCardProps {
  label: string;
  description: string;
  size?: 'small' | 'medium' | 'large';
}

export const GateCard: React.FC<GateCardProps> = ({ 
  label, 
  description, 
  size = 'medium' 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const sizeClasses = {
    small: 'w-16 h-12 text-sm',
    medium: 'w-20 h-16 text-base',
    large: 'w-24 h-20 text-lg'
  };

  return (
    <div className="relative">
      <div
        className={`
          ${sizeClasses[size]}
          bg-gradient-to-br from-blue-100 to-blue-200 
          border-2 border-blue-300 rounded-xl
          flex items-center justify-center
          font-bold text-blue-800
          shadow-md hover:shadow-lg transition-shadow
          cursor-help
        `}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {label}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">i</span>
        </div>
      </div>
      
      {showTooltip && (
        <div className="absolute z-10 top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
          {description}
        </div>
      )}
    </div>
  );
};
