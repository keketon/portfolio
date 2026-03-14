import { useEffect, useState } from 'react';
import type { AnomalyType } from './configs/anomalyConfig';
import type { Card } from './model/Card';
import { applyCardEffects as applyCardEffectsUtil } from '@/lib/cardEffects';

export interface Parameter {
  key: string;
  label: string;
}

export type TabConfig =
  | {
      prefix: 'sense';
      parameters: Parameter[];
      calculate: (values: Record<string, number>) => number;
    }
  | {
      prefix: 'anomaly';
      parameters: Parameter[];
      calculate: (values: Record<string, number>, type: AnomalyType) => number;
    };

export const useCalculator = (config: TabConfig) => {
  // Initialize state dynamically based on parameters
  const initialValues: Record<string, string> = {};
  config.parameters.forEach(param => {
    initialValues[param.key] = '';
  });

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [score, setScore] = useState<number>(0);
  const [anomalyType, setAnomalyType] = useState<AnomalyType>('tsuyoki');

  // Auto-calculate when any value changes
  useEffect(() => {
    // Convert string values to numbers (treat empty/invalid as 0)
    const numericValues: Record<string, number> = {};
    Object.keys(values).forEach(key => {
      numericValues[key] = parseFloat(values[key]) || 0;
    });

    // Calculate score using the provided formula
    const calculatedScore =
      config.prefix === 'sense' ? config.calculate(numericValues) : config.calculate(numericValues, anomalyType);
    setScore(calculatedScore);
  }, [values, config, anomalyType]);

  // Generic change handler for any parameter
  const handleChange = (key: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Reset all parameters to empty strings and score to 0
  const handleReset = () => {
    const resetValues: Record<string, string> = {};
    config.parameters.forEach(param => {
      resetValues[param.key] = '';
    });
    setValues(resetValues);
    setScore(0);
    setAnomalyType('tsuyoki');
  };

  // Apply card effects to current parameter values
  const applyCardEffects = (card: Card) => {
    const updatedValues = applyCardEffectsUtil(values, card.effects);
    setValues(updatedValues);
  };

  return {
    values,
    score,
    handleChange,
    handleReset,
    applyCardEffects,
    anomalyType,
    setAnomalyType,
  };
};
