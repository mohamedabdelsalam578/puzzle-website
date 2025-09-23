import React from 'react';
import { Wire } from '../components/Wire';
import { useGame } from '../state/store';
import { compute } from './gates';

export const WireDiagram: React.FC = () => {
  const { A, B, C } = useGame();
  const signals = compute(A, B, C);

  // Define positions for components (these will match the layout in the main component)
  const positions = {
    // Switches (left side)
    switchA: { x: 80, y: 100 },
    switchB: { x: 80, y: 200 },
    switchC: { x: 80, y: 300 },
    
    // Gates (middle)
    or1: { x: 200, y: 150 },
    or2: { x: 320, y: 200 },
    not1: { x: 320, y: 120 },
    or3: { x: 440, y: 100 },
    not2: { x: 440, y: 60 },
    and: { x: 440, y: 200 },
    nor: { x: 440, y: 300 },
    
    // Lamps (right side)
    lamp1: { x: 560, y: 100 },
    lamp2: { x: 560, y: 60 },
    lamp3: { x: 560, y: 200 },
    lamp4: { x: 560, y: 240 },
    lamp5: { x: 560, y: 300 },
    lamp6: { x: 560, y: 340 },
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      {/* A and B to OR1 */}
      <Wire from={positions.switchA} to={positions.or1} value={A} />
      <Wire from={positions.switchB} to={positions.or1} value={B} />
      
      {/* OR1 to OR2, C to OR2 */}
      <Wire from={positions.or1} to={positions.or2} value={signals.OR1} />
      <Wire from={positions.switchC} to={positions.or2} value={C} />
      
      {/* OR2 to multiple destinations */}
      <Wire from={positions.or2} to={positions.not1} value={signals.OR2} />
      <Wire from={positions.or2} to={positions.or3} value={signals.OR2} />
      <Wire from={positions.or2} to={positions.and} value={signals.OR2} />
      <Wire from={positions.or2} to={positions.nor} value={signals.OR2} />
      
      {/* NOT1 to OR3 */}
      <Wire from={positions.not1} to={positions.or3} value={signals.NOT_TOP} />
      
      {/* OR3 to Lamp1 and NOT2 */}
      <Wire from={positions.or3} to={positions.lamp1} value={signals.OR3} />
      <Wire from={positions.or3} to={positions.not2} value={signals.OR3} />
      
      {/* NOT2 to Lamp2 */}
      <Wire from={positions.not2} to={positions.lamp2} value={signals.NOT_TOP} />
      
      {/* AND to Lamp3 and Lamp4 */}
      <Wire from={positions.and} to={positions.lamp3} value={signals.AND_MID} />
      <Wire from={positions.and} to={positions.lamp4} value={signals.AND_MID} />
      
      {/* NOR to Lamp5 and Lamp6 */}
      <Wire from={positions.nor} to={positions.lamp5} value={signals.NOR_BOT} />
      <Wire from={positions.nor} to={positions.lamp6} value={signals.NOR_BOT} />
    </svg>
  );
};
