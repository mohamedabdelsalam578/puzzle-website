import React from 'react';
import type { Bit } from '../logic/gates';

interface LampProps {
  value: Bit;
  label?: string;
}

export const Lamp: React.FC<LampProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <div
        className={`
          w-12 h-12 rounded-full border-4 transition-all duration-300
          flex items-center justify-center text-2xl
          ${value 
            ? 'bg-green-400 border-green-300 shadow-lg shadow-green-300/50 animate-pulse' 
            : 'bg-gray-300 border-gray-400'
          }
        `}
      >
        {value ? '💡' : '⚫'}
      </div>
      {label && (
        <span className="text-xs text-gray-600 font-medium">{label}</span>
      )}
    </div>
  );
};
