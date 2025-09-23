import React from 'react';
import type { Bit } from '../logic/gates';

interface SwitchProps {
  label: string;
  value: Bit;
  onToggle: () => void;
}

export const Switch: React.FC<SwitchProps> = ({ label, value, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`
        w-20 h-12 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50
        ${value 
          ? 'bg-green-500 focus:ring-green-300' 
          : 'bg-red-500 focus:ring-red-300'
        }
        flex items-center justify-center text-white font-bold text-lg
        hover:scale-105 active:scale-95
        shadow-lg
      `}
      style={{ minHeight: '48px' }}
    >
      <div className="flex flex-col items-center">
        <span className="text-sm font-bold">{label}</span>
        <span className="text-xs">{value ? 'ON' : 'OFF'}</span>
      </div>
    </button>
  );
};
