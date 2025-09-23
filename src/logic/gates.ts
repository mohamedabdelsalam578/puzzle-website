export type Bit = 0 | 1;

export const NOT = (a: Bit): Bit => (a ? 0 : 1);
export const OR = (a: Bit, b: Bit): Bit => (a || b ? 1 : 0);
export const AND = (a: Bit, b: Bit): Bit => (a && b ? 1 : 0);
export const NOR = (a: Bit, b: Bit): Bit => (OR(a, b) ? 0 : 1);

// Computes all signals from inputs A,B,C
export function compute(A: Bit, B: Bit, C: Bit) {
  const OR1 = OR(A, B);
  const OR2 = OR(OR1, C);
  const OR3 = OR(OR2, NOT(OR2)); // always 1
  const NOT_TOP = NOT(OR3); // always 0
  const AND_MID = AND(OR1, OR2);
  const NOR_BOT = NOR(OR1, OR2);

  return {
    OR1,
    OR2,
    OR3,
    NOT_TOP,
    AND_MID,
    NOR_BOT,
    lamps: [OR3, NOT_TOP, AND_MID, AND_MID, NOR_BOT, NOR_BOT] as Bit[],
  };
}
