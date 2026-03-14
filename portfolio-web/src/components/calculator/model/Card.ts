export interface CardEffect {
  parameter: string;
  operation: string;
}

export interface Card {
  id: number;
  name: string;
  type: 'mental' | 'active' | 'misc';
  plan: 'free' | 'sense' | 'logic' | 'anomaly';
  effects: CardEffect[];
}
