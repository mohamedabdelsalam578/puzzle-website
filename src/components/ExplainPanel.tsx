import React from 'react';

interface ExplainPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExplainPanel: React.FC<ExplainPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">How it works!</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <p className="text-sm">
            <strong>Top two lamps:</strong> Always opposites! The first is always ON, the second is always OFF.
          </p>
          
          <p className="text-sm">
            <strong>Middle two lamps:</strong> They move together! They turn ON only when both middle signals are ON.
          </p>
          
          <p className="text-sm">
            <strong>Bottom two lamps:</strong> They also move together! They turn ON only when both middle signals are OFF.
          </p>
          
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <h4 className="font-bold text-sm mb-2">Quick Reference:</h4>
            <div className="text-xs space-y-1">
              <div><strong>AND:</strong> ON only when both inputs are ON</div>
              <div><strong>NOR:</strong> ON only when both inputs are OFF</div>
            </div>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};
