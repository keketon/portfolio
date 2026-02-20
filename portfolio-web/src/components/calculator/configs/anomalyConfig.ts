import { type TabConfig } from '../useCalculator';

export type AnomalyType = 'tsuyoki' | 'zenryoku';

export const anomalyConfig: TabConfig = {
  prefix: 'anomaly',
  parameters: [
    { key: 'parameta', label: 'Parameta' },
    { key: 'allOffset', label: 'Intensity' },
    { key: 'tsuyokiOffset', label: 'Tsuyoki Offset' },
    { key: 'zenryokuOffset', label: 'Zenryoku Offset' },
    { key: 'totalMultiplier', label: 'Total Multiplier (%)' },
  ],
  // TODO: Add type
  calculate: (values: Record<string, number>) => {
    const { parameta, allOffset, tsuyokiOffset, zenryokuOffset, totalMultiplier } = values;
    const type = 'tsuyoki'; // TODO: Placeholder - in a real implementation, this would come from user input or config
    const base = parameta + allOffset + (type === 'tsuyoki' ? tsuyokiOffset : zenryokuOffset);
    return base * (1 + totalMultiplier / 100);
  },
};
