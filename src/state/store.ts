import { create } from 'zustand';
import type { Bit } from '../logic/gates';
import { compute } from '../logic/gates';

type State = {
  A: Bit;
  B: Bit;
  C: Bit;
  lamps: Bit[];
  reset: () => void;
  toggle: (k: 'A' | 'B' | 'C') => void;
};

const init = () => compute(0, 0, 0).lamps;

export const useGame = create<State>((set, get) => ({
  A: 0,
  B: 0,
  C: 0,
  lamps: init(),
  reset: () => set({ A: 0, B: 0, C: 0, lamps: init() }),
  toggle: (k) => {
    const s = { A: get().A, B: get().B, C: get().C };
    s[k] = (s[k] ? 0 : 1) as Bit;
    set({ ...s, lamps: compute(s.A, s.B, s.C).lamps });
  },
}));
