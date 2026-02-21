import { type TabConfig } from '../useCalculator';

export type AnomalyType = 'tsuyoki' | 'zenryoku';

export const anomalyConfig: TabConfig = {
  prefix: 'anomaly',
  parameters: [
    { key: 'parameta', label: 'Parameta' },
    { key: 'allReinforcement', label: 'All Reinforcement' },
    { key: 'tsuyokiReinforcement', label: 'Tsuyoki Reinforcement' },
    { key: 'zenryokuReinforcement', label: 'Zenryoku Reinforcement' },
    { key: 'netsui', label: 'Netsui' },
    { key: 'totalMultiplier', label: 'Total Multiplier (%)' },
  ],
  calculate: (values: Record<string, number>, type: AnomalyType) => {
    const { parameta, allReinforcement, tsuyokiReinforcement, zenryokuReinforcement, netsui, totalMultiplier } = values;
    const base =
      parameta + netsui + allReinforcement + (type === 'tsuyoki' ? tsuyokiReinforcement : zenryokuReinforcement);
    return base * (1 + totalMultiplier / 100);
  },
};
