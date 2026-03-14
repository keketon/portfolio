import { useMemo } from 'react';
import type { Card } from '@/components/calculator/model/Card';
import skillCardsData from '@/assets/gak-data/skill_cards.json';

export function useCards() {
  const cards = useMemo(() => skillCardsData as Card[], []);

  return {
    cards,
  };
}
