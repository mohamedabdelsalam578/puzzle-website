import React, { useState } from 'react';
import { useGame } from '../state/store';
import { Switch } from './Switch';
import { GateCard } from './GateCard';
import { Lamp } from './Lamp';
import { Controls } from './Controls';
import { ExplainPanel } from './ExplainPanel';
import { WireDiagram } from '../logic/wires';

export const Level3: React.FC = () => {
  const { A, B, C, lamps, reset, toggle } = useGame();
  const [showExplain, setShowExplain] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Logic Lights • Level 3</h1>
          <p className="text-gray-600">Toggle the switches and watch the lights change!</p>
        </div>

        {/* Game Area */}
        <div className="relative bg-white rounded-2xl shadow-xl p-8 min-h-[600px]">
          {/* Wire Diagram */}
          <WireDiagram />
          
          {/* Switches (Left Side) */}
          <div className="absolute left-8 top-20 space-y-8">
            <div className="flex flex-col items-center space-y-2">
              <Switch label="A" value={A} onToggle={() => toggle('A')} />
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Switch label="B" value={B} onToggle={() => toggle('B')} />
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Switch label="C" value={C} onToggle={() => toggle('C')} />
            </div>
          </div>

          {/* Gates (Middle) */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-4">
            {/* Top row */}
            <div className="flex justify-center space-x-8">
              <GateCard 
                label="OR" 
                description="OR: if any input is ON, output is ON"
                size="medium"
              />
              <GateCard 
                label="NOT" 
                description="NOT: output is opposite of input"
                size="small"
              />
              <GateCard 
                label="OR" 
                description="OR: if any input is ON, output is ON"
                size="medium"
              />
            </div>
            
            {/* Middle row */}
            <div className="flex justify-center space-x-8">
              <GateCard 
                label="OR" 
                description="OR: if any input is ON, output is ON"
                size="medium"
              />
              <GateCard 
                label="AND" 
                description="AND: output is ON only when both inputs are ON"
                size="medium"
              />
            </div>
            
            {/* Bottom row */}
            <div className="flex justify-center">
              <GateCard 
                label="NOR" 
                description="NOR: output is ON only when both inputs are OFF"
                size="medium"
              />
            </div>
          </div>

          {/* Lamps (Right Side) */}
          <div className="absolute right-8 top-16 space-y-6">
            {lamps.map((lamp, index) => (
              <Lamp 
                key={index} 
                value={lamp} 
                label={`L${index + 1}`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <Controls 
              onReset={reset}
              onExplain={() => setShowExplain(true)}
            />
          </div>
        </div>

        {/* Target Pattern Display */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Target Pattern (A=0, B=0, C=0)</h3>
          <div className="flex justify-center space-x-4">
            {[1, 0, 0, 0, 1, 1].map((target, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  target ? 'bg-green-400 border-green-300' : 'bg-gray-300 border-gray-400'
                }`}>
                  {target ? '💡' : '⚫'}
                </div>
                <span className="text-xs text-gray-600 mt-1">L{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explain Panel */}
      <ExplainPanel 
        isOpen={showExplain}
        onClose={() => setShowExplain(false)}
      />
    </div>
  );
};
