import { useEffect, useState } from 'react';

export interface Parameter {
  key: string;
  label: string;
}

export interface TabConfig {
  prefix: string;
  parameters: Parameter[];
  calculate: (values: Record<string, number>) => number;
}

export const useCalculator = (config: TabConfig) => {
  // Initialize state dynamically based on parameters
  const initialValues: Record<string, string> = {};
  config.parameters.forEach(param => {
    initialValues[param.key] = '';
  });

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [score, setScore] = useState<number>(0);

  // Auto-calculate when any value changes
  useEffect(() => {
    // Convert string values to numbers (treat empty/invalid as 0)
    const numericValues: Record<string, number> = {};
    Object.keys(values).forEach(key => {
      numericValues[key] = parseFloat(values[key]) || 0;
    });

    // Calculate score using the provided formula
    const calculatedScore = config.calculate(numericValues);
    setScore(calculatedScore);
  }, [values, config]);

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
  };

  return {
    values,
    score,
    handleChange,
    handleReset,
  };
};
