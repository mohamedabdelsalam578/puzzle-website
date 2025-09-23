import { describe, it, expect } from 'vitest';
import { NOT, OR, AND, NOR, compute } from '../logic/gates';

describe('Logic Gates', () => {
  describe('NOT gate', () => {
    it('should return 0 when input is 1', () => {
      expect(NOT(1)).toBe(0);
    });
    
    it('should return 1 when input is 0', () => {
      expect(NOT(0)).toBe(1);
    });
  });

  describe('OR gate', () => {
    it('should return 0 when both inputs are 0', () => {
      expect(OR(0, 0)).toBe(0);
    });
    
    it('should return 1 when first input is 1', () => {
      expect(OR(1, 0)).toBe(1);
    });
    
    it('should return 1 when second input is 1', () => {
      expect(OR(0, 1)).toBe(1);
    });
    
    it('should return 1 when both inputs are 1', () => {
      expect(OR(1, 1)).toBe(1);
    });
  });

  describe('AND gate', () => {
    it('should return 0 when both inputs are 0', () => {
      expect(AND(0, 0)).toBe(0);
    });
    
    it('should return 0 when first input is 1, second is 0', () => {
      expect(AND(1, 0)).toBe(0);
    });
    
    it('should return 0 when first input is 0, second is 1', () => {
      expect(AND(0, 1)).toBe(0);
    });
    
    it('should return 1 when both inputs are 1', () => {
      expect(AND(1, 1)).toBe(1);
    });
  });

  describe('NOR gate', () => {
    it('should return 1 when both inputs are 0', () => {
      expect(NOR(0, 0)).toBe(1);
    });
    
    it('should return 0 when first input is 1', () => {
      expect(NOR(1, 0)).toBe(0);
    });
    
    it('should return 0 when second input is 1', () => {
      expect(NOR(0, 1)).toBe(0);
    });
    
    it('should return 0 when both inputs are 1', () => {
      expect(NOR(1, 1)).toBe(0);
    });
  });

  describe('compute function', () => {
    it('should return correct initial state for A=0, B=0, C=0', () => {
      const result = compute(0, 0, 0);
      expect(result.lamps).toEqual([1, 0, 0, 0, 1, 1]);
    });
    
    it('should return correct state for A=1, B=0, C=0', () => {
      const result = compute(1, 0, 0);
      expect(result.lamps).toEqual([1, 0, 1, 1, 0, 0]);
    });
    
    it('should return correct state for A=0, B=1, C=0', () => {
      const result = compute(0, 1, 0);
      expect(result.lamps).toEqual([1, 0, 1, 1, 0, 0]);
    });
    
    it('should return correct state for A=0, B=0, C=1', () => {
      const result = compute(0, 0, 1);
      expect(result.lamps).toEqual([1, 0, 0, 0, 0, 0]);
    });
    
    it('should return correct state for A=1, B=1, C=1', () => {
      const result = compute(1, 1, 1);
      expect(result.lamps).toEqual([1, 0, 1, 1, 0, 0]);
    });
  });
});
