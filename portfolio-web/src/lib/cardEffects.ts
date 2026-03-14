import type { CardEffect } from '@/components/calculator/model/Card';

/**
 * Parses an operation string (e.g., "+2", "-3", "*1.5") into operator and value
 */
export function parseOperation(operation: string): { operator: string; value: number } {
  const match = operation.match(/^([+\-*/])(.+)$/);
  if (!match) {
    throw new Error(`Invalid operation format: ${operation}`);
  }
  return {
    operator: match[1],
    value: parseFloat(match[2]),
  };
}

/**
 * Applies a mathematical operation to a current value
 */
export function applyOperation(currentValue: number, operator: string, operand: number): number {
  switch (operator) {
    case '+':
      return currentValue + operand;
    case '-':
      return currentValue - operand;
    case '*':
      return currentValue * operand;
    case '/':
      return operand !== 0 ? currentValue / operand : currentValue;
    default:
      return currentValue;
  }
}

/**
 * Applies card effects to current parameter values
 * @param currentValues - Current parameter values as strings (from calculator state)
 * @param effects - Array of card effects to apply
 * @returns Updated parameter values as strings
 */
export function applyCardEffects(currentValues: Record<string, string>, effects: CardEffect[]): Record<string, string> {
  const updatedValues = { ...currentValues };

  effects.forEach(effect => {
    const currentValue = parseFloat(currentValues[effect.parameter]) || 0;
    const { operator, value } = parseOperation(effect.operation);
    const newValue = applyOperation(currentValue, operator, value);
    updatedValues[effect.parameter] = newValue.toString();
  });

  return updatedValues;
}
