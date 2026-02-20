import { Button } from '@/components/ui/button';
import { useTr } from '@/i18n/tr';
import React from 'react';
import ParameterInput from './ParameterInput';
import { type TabConfig, useCalculator } from './useCalculator';

interface CalculatorTabProps {
  config: TabConfig;
}

const CalculatorTab: React.FC<CalculatorTabProps> = ({ config }) => {
  const { tr } = useTr();
  const { values, score, handleChange, handleReset } = useCalculator(config);

  return (
    <div className="space-y-6">
      {/* Score Display */}
      <div className="w-full p-6 bg-white/10 rounded-lg border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-2">{tr('Score', 'ScoreCalculator')}</h2>
        <p className="text-4xl font-bold text-white">{`${score.toFixed(0)} (${score.toFixed(2)})`}</p>
      </div>

      {/* Input Grid - 2 columns on md+, 1 column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {config.parameters.map(param => (
          <ParameterInput
            key={param.key}
            id={`${config.prefix}-${param.key}`}
            label={tr(param.label, 'ScoreCalculator')}
            value={values[param.key]}
            onChange={val => handleChange(param.key, val)}
            placeholder={tr(`Enter ${param.label} value`, 'ScoreCalculator')}
          />
        ))}
      </div>

      {/* Reset Button */}
      <div className="flex justify-end">
        <Button onClick={handleReset} variant="outline">
          {tr('Reset', 'ScoreCalculator')}
        </Button>
      </div>
    </div>
  );
};

export default CalculatorTab;
