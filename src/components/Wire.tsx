import React from 'react';
import type { Bit } from '../logic/gates';

interface WireProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  value: Bit;
  label?: string;
}

export const Wire: React.FC<WireProps> = ({ from, to, value, label }) => {
  const path = `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${from.y - 20} ${to.x} ${to.y}`;
  
  return (
    <g>
      <path
        d={path}
        stroke={value ? '#10b981' : '#6b7280'}
        strokeWidth={value ? '4' : '2'}
        fill="none"
        className={value ? 'drop-shadow-lg' : ''}
        style={{
          filter: value ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))' : 'none'
        }}
      />
      {label && (
        <text
          x={(from.x + to.x) / 2}
          y={(from.y + to.y) / 2 - 10}
          textAnchor="middle"
          className="text-xs fill-gray-600 font-medium"
        >
          {label}
        </text>
      )}
    </g>
  );
};
