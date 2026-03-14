import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTr } from '@/i18n/tr';
import React from 'react';
import ParameterInput from './ParameterInput';
import { type TabConfig, useCalculator } from './useCalculator';
import CardSelector from './CardSelector';
import { useCards } from '@/hooks/useCards';

interface CalculatorTabProps {
  config: TabConfig;
}

const CalculatorTab: React.FC<CalculatorTabProps> = ({ config }) => {
  const { tr } = useTr();
  const { cards } = useCards();
  const { values, score, handleChange, handleReset, applyCardEffects, anomalyType, setAnomalyType } =
    useCalculator(config);

  return (
    <div className="space-y-6">
      {/* Score Display */}
      <div className="w-full p-6 bg-white/10 rounded-lg border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-2">{tr('Score', 'ScoreCalculator')}</h2>
        <p className="text-4xl font-bold text-white">{`${score.toFixed(0)} (${score.toFixed(2)})`}</p>
      </div>

      {/* Card Selection */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">{tr('Card Selection', 'ScoreCalculator')}</h2>
        <CardSelector
          cards={cards}
          onSelectCard={card => {
            applyCardEffects(card);
          }}
        />
      </div>

      {/* Parameters Input */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">{tr('Parameters', 'ScoreCalculator')}</h2>
        {/* Anomaly Type Toggle (only for anomaly tab) */}
        {config.prefix === 'anomaly' && (
          <div
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => setAnomalyType(anomalyType === 'tsuyoki' ? 'zenryoku' : 'tsuyoki')}
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-white">
                {anomalyType === 'tsuyoki' ? tr('Tsuyoki', 'ScoreCalculator') : tr('Zenryoku', 'ScoreCalculator')}
              </span>
              <span className="text-xs text-white/60">{tr('Anomaly Type', 'ScoreCalculator')}</span>
            </div>
            <div onClick={e => e.stopPropagation()}>
              <Switch
                checked={anomalyType === 'zenryoku'}
                onCheckedChange={checked => setAnomalyType(checked ? 'zenryoku' : 'tsuyoki')}
              />
            </div>
          </div>
        )}

        {/* Input Grid - 2 columns grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.parameters.map(param => (
            <ParameterInput
              key={param.key}
              id={`${config.prefix}-${param.key}`}
              label={tr(param.label, 'ScoreCalculator')}
              value={values[param.key]}
              onChange={val => handleChange(param.key, val)}
              // TODO: Fix translation
              placeholder={tr(`Enter ${param.label} value`, 'ScoreCalculator')}
            />
          ))}
        </div>
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
