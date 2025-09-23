import React from 'react';

interface ControlsProps {
  onReset: () => void;
  onExplain: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onReset, onExplain }) => {
  return (
    <div className="flex gap-4 justify-center mt-6">
      <button
        onClick={onReset}
        className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Reset
      </button>
      <button
        onClick={onExplain}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Explain
      </button>
    </div>
  );
};
