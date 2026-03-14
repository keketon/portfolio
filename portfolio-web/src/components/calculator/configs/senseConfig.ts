import { type TabConfig } from '../useCalculator';

export const senseConfig: TabConfig = {
  prefix: 'sense',
  parameters: [
    { key: 'parameta', label: 'Parameta' },
    { key: 'kocho', label: 'Kocho' },
    { key: 'shuchu', label: 'Shuchu' },
    { key: 'zekocho', label: 'Zekocho' },
    { key: 'totalMultiplier', label: 'Total Multiplier (%)' },
    { key: 'kochoMultiplier', label: 'Kocho Multiplier (x n)' },
    { key: 'shuchuMultiplier', label: 'Shuchu Multiplier (x n)' },
    { key: 'shuchuReinforcement', label: 'Shuchu Reinforcement' },
  ],
  calculate: (values: Record<string, number>) => {
    const { parameta, kocho, shuchu, zekocho, totalMultiplier } = values;

    const base = parameta + shuchu;
    const kochoCoef = 1 + (kocho > 0 ? 0.5 : 0) + (zekocho > 0 ? 0.1 * kocho : 0);
    return base * kochoCoef * (1 + totalMultiplier / 100);
  },
};
